<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="模板名称" prop="delivery_name">
						<el-input v-model="formData.delivery_name"></el-input>
					</el-form-item>
					<el-form-item label="计费方式" prop="method">
						<el-radio v-model="formData.method" label="10">按件数</el-radio>
                        <el-radio v-model="formData.method" label="20">按重量</el-radio>
					</el-form-item>

					<el-form-item label="配送区域及运费" prop="rule">
						<el-table
						    :data="tableData"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="date"
						      label="可配送区域"
						      >
						    </el-table-column>
						    <el-table-column
						      prop="name"
						      label="首件(个)"
						      >
						    </el-table-column>
						    <el-table-column
						      prop="address"
						      label="运费(元)"
						      >
						    </el-table-column>
						    <el-table-column
						      prop="address"
						      label="续件(个)"
						      >
						    </el-table-column>
						    <el-table-column
						      prop="address"
						      label="续费(元)"
						      >
						    </el-table-column>
						</el-table>
						<el-button type="info" round>添加配送区域</el-button>
					</el-form-item>
					<el-form-item label="排序" prop="sort_id">
						<el-input v-model="formData.sort_id"></el-input>
					</el-form-item>
					

					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {categoryList, addCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			categoryData: [],
    			fileList:[],
    			formData: {
                    delivery_name:'sfhfd', 
					rule:[],
					method:'10',
					sort_id:'100'
		        },
		        rules: {
					delivery_name: [
						{ required: true, message: '请输入权限名称', trigger: 'blur' },
					],
					method: [
						{ required: true, message: '请输选择计费方式', trigger: 'blur' },
					],
					rule: [
						{ required: true, message: '请选择配送范围', trigger: 'blur' }
					]
				},
    		}
    	},
    	components: {
    		headTop,
    	},
    	activated(){
    		this.initData();
    		this.formData = {
                    name: '', 
					en_name:'',
					parent_id:'',
					image_url:'',
					is_index:'1',
					sort_id:'100'
		        };
    	},
    	methods: {
    		async initData(){
    			try{
    				const res = await categoryList();
    				console.log(res);
    				if(res.status == 1){
    				   this.categoryData = res.data.categoryData
    				}else if(res.status == -1){
                       this.$router.push('/')
                    }else{
                        this.$message({
                          type: 'error',
                          message: role.message
                        });

                       this.$router.push('category');
                    }
    			}catch(err){
    				console.log(err);
    			}
    		},

		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
					    console.log(this.formData);
						try{
							const res = await addCategory(this.formData);
							console.log(res);
							if (res.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.$router.push('category')
							}else{
								this.$message({
					            	type: 'error',
					            	message: res.message
					          	});
							}
							console.log(result)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
			upSuccess(response, file, fileList){
			  if(response.status == 1){
			     this.fileList = [{'url':response.data.path}];
			     this.formData.image_url = response.data.path;
			  }
			}
		}
    }
</script>

<style lang="less">
	@import '../../../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
