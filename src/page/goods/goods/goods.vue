<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
              <el-form-item>
                <el-button type="primary" @click="addGoods">添加商品分类</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="分类名称"
                width="260"
                align="center">
              </el-table-column>
              <el-table-column
                prop="en_name"
                label="英文名称"
                width="260"
                align="center">
              </el-table-column>
              <el-table-column
                prop="is_index"
                label="是否展示"
                width="260"
                align="center">
                  <template slot-scope="scope">
                     <el-tag type="success"  v-if="scope.row.is_index =='1'">展示</el-tag> 
                  </template>
              </el-table-column>
              <el-table-column
                prop="image_url"
                label="分类图"
                width="260"
                align="center">
                  <template   slot-scope="scope">            
                    <img :src="scope.row.image_url"  width="60px" height="60px" />
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
    import {goodsList,deleteCategory} from '@/api/getData'
    export default {
        data(){
            return {
                tableData:[],
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
                    const res = await goodsList();
                    console.log(res);
                    if(res.status == 1){
                       this.tableData = res.data.categoryData;
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
            addGoods(){
               this.$router.push('addGoods')
            },
            handleEdit(row){
              this.$router.push({path: '/editCategory',query:{id:row.id}});
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async() => {
                  const res = await deleteCategory(row.id);
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
  @import '../../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
