<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="formData.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="formData.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="password2">
						<el-input type="password" v-model="formData.password2"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="formData.phone"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="formData.email"></el-input>
					</el-form-item>
                    <el-form-item label="角色" prop="role_id">
						<el-checkbox-group v-model="formData.role_id">
						    <el-checkbox v-for="item in roleData" :label="item.id">{{item.name}}</el-checkbox>
						</el-checkbox-group>
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
    import {roleList, addAdmin} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
	    	var checkPass = (rule, value, callback) => {
			        if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== this.formData.password) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
			};
    		return {
    			roleData: [],
    			formData: {
                    username: '', 
					password:'',
					password2:'',
					phone:'',
					email:'',
					role_id:[],
		        },
		        rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min:6, message: '至少为六个字符', trigger: 'blur' }
					],
					password2: [
						{ validator: checkPass, trigger: 'blur' }
					],
					role_id: [
						{ required: true, message: '请选择用户角色'},
					],
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
    				const res = await roleList();
    				console.log(res);
    				if(res.status == 1){
    				   this.roleData = res.data.roleData
    				}else if(res.status == -1){
                       this.$router.push('/')
                    }else{
                        this.$message({
                          type: 'error',
                          message: role.message
                        });

                       this.$router.push('admin');
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
							const res = await addAdmin(this.formData);
							console.log(res);
							if (res.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.$router.push('admin')
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
</style>
