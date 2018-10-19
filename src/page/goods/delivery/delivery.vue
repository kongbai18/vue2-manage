<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
              <el-form-item>
                <el-button type="primary" @click="addDelivery">添加配送模板</el-button>
              </el-form-item>
            </el-form>
        </el-col>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="delivery_name"
                label="模板名称"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="method"
                label="计费方式"
                width="200"
                align="center">
                   <template slot-scope="scope">
                     <el-tag type="info"  v-if="scope.row.method =='10'">按件数</el-tag> 
                     <el-tag type="info"  v-if="scope.row.method =='20'">按重量</el-tag>  
                   </template>
              </el-table-column>
              <el-table-column
                prop="sort_id"
                label="排序"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="update_time"
                label="更新时间"
                width="300"
                align="center">
                   <template slot-scope="scope">   
                     <span>{{timestampToTime(scope.row.update_time)}}</span>
                   </template>
              </el-table-column>
            
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {deliveryList,deleteDelivery} from '@/api/getData'
    export default {
        data(){
            return {
                permissionData:[],
                tableData:[]
            }
        },
      components: {
        headTop,
      },
        activated(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const res = await deliveryList();
                    console.log(res)
                    if(res.status == 1){
                       this.tableData = res.data.deliveryList;
                    }else if(res.status == -1){
                       this.$router.push('/')
                    }else{
                        this.$message({
                          type: 'error',
                          message: role.message
                        });

                       this.$router.push('manage');
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            addDelivery(){
               this.$router.push('addDelivery')
            },
            handleEdit(row){
              this.$router.push({path: '/editAdmin',query:{id:row.id}});
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async() => {
                  const res = await deleteAdmin(row.id);
                  console.log(res);
                  if(res.status == 1){
                      this.$message({
                            type: 'success',
                            message: '删除成功'
                      });
                      this.initData();
                  }else{
                      this.$message({
                            type: 'error',
                            message: res.message
                      });
                  }
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });

            },
            async changeStatus(row){
                const res = await setStatus({id:row.id});
                console.log(res);
                if(res.status == 1){
                    this.$message({
                          type: 'success',
                          message: '修改状态成功'
                    });
                    this.initData();
                }else{
                    this.$message({
                          type: 'error',
                          message: res.message
                    });
                }
            },
            timestampToTime(timestamp) {
              var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
              var D = date.getDate() + ' ';
              var h = date.getHours() + ':';
              var m = date.getMinutes() + ':';
              var s = date.getSeconds();
              return Y+M+D+h+m+s;
            }
        },
    }
</script>

<style lang="less">
  @import '../../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
