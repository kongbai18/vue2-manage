<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
              <el-form-item>
                <el-button type="primary" @click="addPermission">添加权限节点</el-button>
              </el-form-item>
            </el-form>
        </el-col>
            <el-table
              :data="permissionData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="权限名称"
                width="260"
                align="center">
              </el-table-column>
              <el-table-column
                prop="module_name"
                label="模块名称"
                width="260"
                align="center">
              </el-table-column>
              <el-table-column
                prop="controller_name"
                label="控制器名称"
                width="260"
                align="center">
              </el-table-column>
              <el-table-column
                prop="action_name"
                label="方法名称"
                width="260"
                align="center">
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
    import headTop from '../../components/headTop'
    import {permissionList,deletePermission} from '@/api/getData'
    export default {
        data(){
            return {
                permissionData:[],
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
                    const permissionData = await permissionList();
                    console.log(permissionData);
                    if(permissionData.status == 1){
                       this.permissionData = permissionData.data.permissionData;
                    }else if(permissionData.status == -1){
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
            addPermission(){
               this.$router.push('addPermission')
            },
            handleEdit(row){
              this.$router.push({path: '/editPermission',query:{id:row.id}});
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async() => {
                  const res = await deletePermission(row.id);
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
