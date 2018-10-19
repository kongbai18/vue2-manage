<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="20" :offset="2">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-formData">
					<el-form-item label="商品名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="商品分类" prop="parent_id">
						<el-select v-model="formData.parent_id" filterable placeholder="请选择">
						    <el-option value="0" label="顶级权限">顶级权限</el-option>
						    <el-option
						      v-for="item in categoryData"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品图片" prop="image_url">
						<el-upload
							  class="upload-demo"
							  action="http://jiihome.shimentown.com/platformmgmt/v1/upload"
							  :file-list="fileList"
							  :on-success="upSuccess"
							  with-credentials
							  list-type="picture-card"
							  :auto-upload="false">
							  <el-button size="small" type="primary">点击上传</el-button>
							  <div slot="tip" class="el-upload__tip">上传文件不超过2M</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="商品规格" prop="spec_type">
					  <el-radio-group v-model="formData.spec_type">
						<el-radio  label="10" >单规格</el-radio>
                        <el-radio  label="20" >多规格</el-radio>
                      </el-radio-group>  
					</el-form-item>
					<div v-if="formData.spec_type == 10">
	                    <el-form-item label="商品价格" prop="en_name">
							<el-input v-model="formData.en_name"></el-input>
						</el-form-item>
						<el-form-item label="商品划线价" prop="en_name">
							<el-input v-model="formData.en_name"></el-input>
						</el-form-item>
						<el-form-item label="当前库存数量" prop="en_name">
							<el-input v-model="formData.en_name"></el-input>
						</el-form-item>
						<el-form-item label="商品重量(Kg)" prop="en_name">
							<el-input v-model="formData.en_name"></el-input>
						</el-form-item>
					</div>

					<div v-if="formData.spec_type == 20">
					   <el-form-item label="" prop="en_name">
					        <div class="muchSpec">
                              <div v-for="(item,index) in ceshi" style="margin-bottom:20px">
                                 <div>{{item.spec_name}}</div>
                                 <el-button v-if="item.type_id == 1" v-for="(value,key) in item.value" size="small" @click="delVal(index,key)">{{value.spec_value}}</el-button>
                                 <img v-if="item.type_id == 2" v-for="(value,key) in item.value" :src="value.spec_value" @click="delVal(index,key)" alt="value.spec_value_alt" style="width=50px;height:50px;margin-right:10px">
                              </div> 

							  <el-button type="info" v-if="showSpec" @click="addSpecTable" >添加规格</el-button>

							  <div v-if="!showSpec">
							        <div>
							            <label>规格类</label>
							            <el-radio  v-model="formData.spec.type_id"  label="1" >文字</el-radio>
                                        <el-radio  v-model="formData.spec.type_id" label="2" >图片</el-radio>
							        </div>
						            <div>
                                        <label class="am-form-label form-require">规格名 </label>
                                        <el-input v-model="formData.spec.spec_name" style="width:100px" size="small"></el-input>
                                    </div>
                                    <div v-if="formData.spec.type_id == 2">
                                         <el-upload
										  class="upload-demo"
										  action="http://jiihome.shimentown.com/platformmgmt/v1/upload"
										  :file-list="fileList1"
										  with-credentials
										  multiple
										  :on-success="upSpecPic"
										  list-type="picture">
										  <el-button size="small" type="primary">点击上传图片</el-button>
										</el-upload>
                                    </div>
                                    <div v-if="formData.spec.type_id == 1">
                                        <label class="am-form-label form-require">规格值 </label>
                                        <el-input v-model="formData.spec.spec_value" style="width:100px" size="small"></el-input>
                                    </div>
                                    <div>
                                        <label class="am-form-label form-require">提示值 </label>
                                        <el-input v-model="formData.spec.spec_value_alt" style="width:100px" size="small"></el-input>
                                    </div>
                                    <div>
                                        <el-button type="success" @click="addSpec">确认</el-button>
                                        <el-button type="danger" @click="specCancel">取消</el-button>
                                    </div>
							  </div>
                              
                              <div v-if="tableData.length != 0" style="margin-top:20px">
							  <el-table		    
							    :data="tableData"
							    border
							    style="width: 100%">
							    <el-table-column
							      v-for="(item,index) in ceshi"
							      prop=""
							      :label="item.spec_name"
							      width="160"
							      align="center">
							      <template slot-scope="scope">
				                     {{scope.row[index].spec_value_alt}}
				                  </template>
							    </el-table-column>
							    <el-table-column
							      prop="address"
							      label="销售价"
							      align="center">
							      <template slot-scope="scope">
				                     <el-input v-model="scope.row.price" style="width:100px" size="small" @keyup.native="number(scope.$index,'price')"></el-input>
				                  </template>
							    </el-table-column>
							    <el-table-column
							      prop="address"
							      label="划线价"
							      align="center">
							      <template slot-scope="scope">
				                     <el-input v-model="scope.row.prices" style="width:100px" size="small"></el-input>
				                  </template>
							    </el-table-column>
							    <el-table-column
							      prop="address"
							      label="库存"
							      align="center">
							      <template slot-scope="scope">
				                     <el-input v-model="scope.row.prices" style="width:100px" size="small"></el-input>
				                  </template>
							    </el-table-column>
							    <el-table-column
							      prop="address"
							      label="重量(Kg)"
							      align="center">
							      <template slot-scope="scope">
				                     <el-input v-model="scope.row.prices" style="width:100px" size="small"></el-input>
				                  </template>
							    </el-table-column>
							    <el-table-column
							      prop="address"
							      label="对应图"
							      align="center">
							      <template slot-scope="scope">
							            <el-upload
										  action="http://jiihome.shimentown.com/platformmgmt/v1/upload"
										  with-credentials
										  :show-file-list="false"
										  :on-success="upSpecValPic">
										  <el-button size="small" type="primary" @click="sepcImgIndex(scope.$index)">点击上传</el-button>
										</el-upload>
									 <img v-if="scope.row.img" :src="scope.row.img" style="width:40px;height:40px">
				                  </template>
							    </el-table-column>
							  </el-table>
							  </div>
							</div>

						</el-form-item>
					   
					</div>

					<el-form-item label="商品描述" prop="en_name">
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
    import {categoryList, addSpec} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			categoryData: [],
    			fileList:[],
    			fileList1:[],
    			tableData:[],
    			editorContent: '',
    			showSpec:true,
    			specStatus:true,
    			spevValStatus:true,
    			ceshi:[],
    			formData: {
                    name: '', 
					en_name:'',
					parent_id:'',
					image_url:'',
					spec_type:'10',
					is_index:'1',
					sort_id:'100',
					spec:{
					   type_id:"1",
					   spec_name:'',
					   spec_value:'',
					   spec_value_alt:'',
					}
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
    				const res = await categoryList();
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
            number(index,key){
              const newData = this.tableData[index];
              newData[key] = newData[key].replace(/[^\d.]/g,"");
              newData[key] = newData[key].replace(/^\./g,"");
              newData[key] = newData[key].replace(/\.{2,}/g,".");
              newData[key] = newData[key].replace(".","$#$").replace(/\./g,"").replace("$#$",".");
              Vue.set(this.tableData,index,newData);
            },
            sepcImgIndex(index){
              console.log(index);
              this.specImgIndex =index;
            },
            upSpecValPic(a,b,c){
            console.log(a)
               const newPicData = this.tableData[this.specImgIndex]
               newPicData.img = a.data.path;
               Vue.set(this.tableData,this.specImgIndex,newPicData);
               console.log(newPicData);
            },
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
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
			  }else{
			     this.fileList = [];
			     this.formData.image_url = [];
			  }
			},
			addSpecTable(){
			  this.showSpec = false;
			},
			specCancel(){
              this.showSpec = true;
			},
			upSpecPic(response, file, fileList){
              if(response.status == 1){
			     this.fileList1 = [{'url':response.data.path}];
			     this.formData.spec.spec_value = response.data.path;
			  }else{
			     this.fileList1 = [];
			     this.formData.spec.value = [];
			  }
			},
			async addSpec(){
			   const res = await addSpec(this.formData.spec);
			   if(res.status == 1){
			      this.specStatus = true;
                  this.ceshi.forEach((item,index) => {
                    if(this.ceshi[index].spec_id == res.data.spec_id){
                       this.spevValStatus = true; 
                       this.ceshi[index].value.forEach((val,key) => {
                           if(this.ceshi[index].value[key].spec_value_id == res.data.spec_value_id){
                              this.ceshi[index].value[key].spec_value = this.formData.spec.spec_value;
                              this.spevValStatus = false; 
                              this.specStatus = false;
                           }
                       })
                       if(this.spevValStatus){
                           this.ceshi[index].value.push({spec_value_id:res.data.spec_value_id,spec_value:this.formData.spec.spec_value,spec_value_alt:this.formData.spec.spec_value_alt});
                           this.specStatus = false;
                       }
                    }
                  });
                  if(this.specStatus){
                    this.ceshi.push({spec_id:res.data.spec_id,spec_name:this.formData.spec.spec_name,type_id:this.formData.spec.type_id,value:[{spec_value_id:res.data.spec_value_id,spec_value:this.formData.spec.spec_value,spec_value_alt:this.formData.spec.spec_value_alt}]});
                  };
                this.showSpec = true;
                this.countSpec();
			   }
			},
			countSpec(){
			   this.tableData = [];
			   this.combineCount = 1;
			   
			   this.ceshi.forEach((item,index) => {
			       this.combineCount *= item.value.length;
			   });

			   this.repeatTime = this.combineCount;
               
			   this.ceshi.forEach((item,index) => {
			       this.repeatTime = this.repeatTime/item.value.length;
			       this.startPosition = 0;
			       this.ceshi[index].value.forEach((val,key) => {
			          this.tempStartPosition = this.startPosition;
			          
			          this.spacCount = this.combineCount/item.value.length/this.repeatTime;
			          for(var j=1;j<=this.spacCount;j++){
			              for(var i=0;i<this.repeatTime;i++){
			                 if(this.tableData[this.tempStartPosition + i] == undefined){
			                    this.tableData[this.tempStartPosition + i] = [];
			                 }
			                 this.tableData[this.tempStartPosition + i][index] = val;
			              }
			              this.tempStartPosition += this.repeatTime*item.value.length;
			          }
			          this.startPosition += this.repeatTime;
			       })
			   });
			},
			delVal(index,key){
			   this.$confirm('此操作将删除规格值影响sku, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async() => {
                   this.ceshi[index].value.splice(key,1);
			       if(this.ceshi[index].value.length == 0){
			         this.ceshi.splice(index,1);
			       }
			       this.countSpec();
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
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
	.muchSpec{
	    border:1px solid #f3f3f3;
	    padding:20px;
	}
</style>
