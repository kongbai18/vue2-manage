<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="分类名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="英文名称" prop="en_name">
						<el-input v-model="formData.en_name"></el-input>
					</el-form-item>
					<el-form-item label="上级分类" prop="parent_id">
						<el-select v-model="formData.parent_id" filterable placeholder="请选择">
						    <el-option value="0" label="顶级权限">顶级权限</el-option>
						    <el-option
						      v-for="item in categoryData"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类图" prop="image_url">
						<el-upload
							  class="upload-demo"
							  action="http://jiihome.shimentown.com/platformmgmt/v1/upload"
							  :file-list="fileList"
							  :on-success="upSuccess"
							  with-credentials
							  list-type="picture-card">
							  <el-button size="small" type="primary">点击上传</el-button>
							  <div slot="tip" class="el-upload__tip">上传文件不超过2M</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="排序" prop="sort_id">
						<el-input v-model="formData.sort_id"></el-input>
					</el-form-item>
					<el-form-item label="是否展示" prop="is_index">
						<el-radio v-model="formData.is_index" label="1">是</el-radio>
                        <el-radio v-model="formData.is_index" label="0">否</el-radio>
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
                    name: '', 
					en_name:'',
					parent_id:'',
					image_url:'',
					is_index:'1',
					sort_id:'100'
		        },
		        rules: {
					name: [
						{ required: true, message: '请输入权限名称', trigger: 'blur' },
					],
					parent_id: [
						{ required: true, message: '请选择上级权限', trigger: 'blur' }
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
