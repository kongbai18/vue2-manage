<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="20" :offset="2">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-formData">
					<el-form-item label="文章名称" prop="article_name">
						<el-input v-model="formData.article_name"></el-input>
					</el-form-item>
					<el-form-item label="文章分类" prop="cate_id">
						<el-select v-model="formData.cate_id" filterable placeholder="请选择">
						    <el-option
						      v-for="item in categoryData"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="文章简介" prop="article_brief">
						<el-input type="textarea" v-model="formData.article_brief"></el-input>
					</el-form-item>
					<el-form-item label="关联商品" prop="goods">
						<el-select v-model="formData.cate_id" filterable placeholder="请选择">
						    <el-option
						      v-for="item in goodsData"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="文章封面" prop="image_url">
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
					

					<el-form-item label="文章内容" prop="content">
							<div id="editorElem" style="text-align:left"></div>
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
    import Vue from 'vue'
    import E from 'wangeditor'
    import headTop from '@/components/headTop'
    import {articleCateList, addArticle,goodsList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			categoryData: [],
    			fileList:[],
    			tableData:[],
    			goodsData:[],
    			editorContent: '',
    			showSpec:true,
    			specStatus:true,
    			spevValStatus:true,
    			ceshi:[],
    			formData: {
                    article_name: '', 
					article_brief:'',
					cate_id:'',
					content:'',
					image_url:'',
					is_index:'1',
					sort_id:'100',
					goods:[],
		        },
		        rules: {
					article_name: [
						{ required: true, message: '请输入权限名称', trigger: 'blur' },
					],
					cate_id: [
						{ required: true, message: '请选择上级权限', trigger: 'blur' }
					],
					image_url: [
						{ required: true, message: '请上传封面图', trigger: 'blur' }
					],
					content: [
						{ required: true, message: '请输入文章内容', trigger: 'blur' }
					]
				},
    		}
    	},

    	components: {
    		headTop,
    	},
    	activated(){
    		this.initData();
    	},
    	mounted() {
	        var editor = new E('#editorElem')
	        editor.customConfig.onchange = (html) => {
	          this.editorContent = html
	        }
	        editor.create()
       },
    	methods: {
    		async initData(){
    			try{
    				const res = await articleCateList();
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

                    const goods = await goodsList();
                    if(goods.status == 1){
                       this.goodsData = goods.data.goods;
                    }
    			}catch(err){
    				console.log(err);
    			}
    		},
		    submitForm(formName) {
		        this.formData.content = this.editorContent;
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						try{
							const res = await addArticle(this.formData);
							console.log(res);
							if (res.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.$router.push('article')
							}else{
								this.$message({
					            	type: 'error',
					            	message: res.message
					          	});
							}
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
            console.log(response);
			  if(response.status == 1){
			     this.fileList = [{'url':response.data.path}];
			     this.formData.image_url = response.data.path;
			  }else{
			     this.fileList = [];
			     this.formData.image_url = '';
			  }
			},
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
	.muchSpec{
	    border:1px solid #f3f3f3;
	    padding:20px;
	}
</style>
