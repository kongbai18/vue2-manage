<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="角色名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="角色描述" prop="content">
						<el-input type="textarea" v-model="formData.content"></el-input>
					</el-form-item>
					<el-form-item label="包含权限" prop="per_id">
						<el-checkbox-group v-model="formData.per_id">
							    <dl v-for="item in permission" class="per-level">
	                              <dt class="per-level-1">
									<el-checkbox :label="item.id" >{{item.name}}</el-checkbox>
								  </dt>
							      <dt v-for="child in item.child" class="per-level-2box">
									<el-checkbox :label="child.id" class="per-level-2">{{child.name}}</el-checkbox>
									<el-checkbox v-for="val in child.child" :label="val.id">{{val.name}}</el-checkbox>
								  </dt>
						        </dl>
						</el-checkbox-group>
					</el-form-item>

					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">确认修改</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {permissionList,getRoleInfo,editRole} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			permissionData: [],
    			permission: [],
    			checkList:[],
    			index:-1,
    			index1:-1,
    			index2:-1,
    			formData: {
                    name: '', //权限名称
					per_id:[],
					module_name:'',
					controller_name:'',
					action_name:'',
					sort_id:'100'
		        },
		        rules: {
					name: [
						{ required: true, message: '请输入权限名称', trigger: 'blur' },
					],
					per_id: [
						{ required: true, message: '请选择权限'}
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
    	methods: {
    		async initData(){
    			try{
    		     	const id = this.$route.query.id;
    			    this.id = id;
    			    const role = await getRoleInfo(id)
    			    console.log(role);
                    if(role.status == 1){
                       this.formData = role.data.roleData
                    }else if(role.status == -1){
                       this.$router.push('/')
                    }else{
                        this.$message({
					        type: 'error',
					        message: role.message
					    });

					    this.$router.push('role');
                    }
                    const res = await permissionList();
    				if(res.status == 1){
    				   this.index = -1;
    				   this.permissionData = [];
    				   res.data.permissionData.forEach(item => {
    				       if(item.level == 0){
    				          this.index = this.index + 1;
                              this.permissionData[this.index] = item;
                              this.permissionData[this.index]['child'] = [];
                              this.index1 = -1;
    				       }else if(item.level == 1){
    				          this.index1 = this.index1 + 1;
    				          this.permissionData[this.index]['child'][this.index1] = item;
    				          this.permissionData[this.index]['child'][this.index1]['child'] = [];
    				          this.index2 = -1;	          
    				       }else if(item.level == 2){
    				          this.index2 = this.index2 + 1;
    				          this.permissionData[this.index]['child'][this.index1]['child'][this.index2] = item;    
    				       }
    				   });
    				   this.permission = this.permissionData
    				}else if(res.status == -1){
                       this.$router.push('/')
                    }
    			}catch(err){
    				console.log(err);
    			}
    		},

		    submitForm(formName) {
		      console.log(this.formData);
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						try{
							const res = await editRole(this.id,this.formData);
							console.log(res);
							if (res.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '修改成功'
					          	});
					          	this.$router.push('role')
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
		}
    }
</script>

<style lang="less">
	@import '../../style/mixin';
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
	.per-level{
	  border:1px solid #f3f3f3;
	}
	.per-level-1{
	    box-sizing:border-box;
	    background:#f3f3f3;
	    padding:5px;
	    font-weight:bold;
	}
	.per-level-2box{
	   border-bottom:1px solid #f3f3f3;
	   margin:0 5px;
	}
	.per-level-2{
	    margin-left:15px;
	    font-weight:bold;
	}
</style>
