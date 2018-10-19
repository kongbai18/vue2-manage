<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
              <el-form-item>
                <el-button type="primary" @click="addAdmin">添加角色</el-button>
              </el-form-item>
            </el-form>
        </el-col>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="username"
                label="管理员名称"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="last_login_time"
                label="上次登陆时间"
                width="300"
                align="center">
                   <template slot-scope="scope">   
                     <span>{{timestampToTime(scope.row.last_login_time)}}</span>
                   </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="启用状态"
                width="200"
                align="center">
                   <template slot-scope="scope">
                     <el-tag type="success"  v-if="scope.row.status =='1'">启用</el-tag> 
                     <el-tag type="danger"  v-if="scope.row.status =='0'">停用</el-tag>  
                   </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    v-if="scope.row.status == '0'"
                    @click="changeStatus(scope.row)">启用</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    v-if="scope.row.status == '1'"
                    @click="changeStatus(scope.row)">停用</el-button>  
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
    import headTop from '../../components/headTop'
    import {adminList,deleteAdmin,setStatus} from '@/api/getData'
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
                    const res = await adminList();
                    console.log(res)
                    if(res.status == 1){
                       this.tableData = res.data.adminList;
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
            addAdmin(){
               this.$router.push('addAdmin')
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
  @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
