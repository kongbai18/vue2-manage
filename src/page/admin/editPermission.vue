<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="权限名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="上级权限">
						<el-select v-model="formData.parent_id" filterable placeholder="请选择">
						    <el-option value="0" label="顶级权限">顶级权限</el-option>
						    <el-option
						      v-for="item in permissionData"
						      :label="item.name"
						      :value="item.id"
						      
						      >
						    </el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="模块名称" prop="module_name">
						<el-input v-model="formData.module_name"></el-input>
					</el-form-item>
					<el-form-item label="控制器名称" prop="controller_name">
						<el-input v-model="formData.controller_name"></el-input>
					</el-form-item>
					<el-form-item label="方法名称" prop="action_name">
						<el-input v-model="formData.action_name"></el-input>
					</el-form-item>
					<el-form-item label="排序" prop="sort_id">
						<el-input v-model="formData.sort_id"></el-input>
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
    import {permissionList,getPermissionChild,getPermissionData,editPermission} from '@/api/getData'
    export default {
    	data(){
    		return {
    		    id:'',
    		    child:[],
    			permissionData: [],
    			formData: {
                    name: '', //权限名称
					parent_id:'',
					module_name:'',
					controller_name:'',
					action_name:'',
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
        },
    	methods: {
    		async initData(){
    			try{
    			    const id = this.$route.query.id;
    			    this.id = id;
                    const permission = await getPermissionData(id);
                    if(permission.status == 1){
                       this.formData = permission.data.permissionData
                    }else if(permission.status == -1){
                       this.$router.push('/')
                    }else{
                        this.$message({
					        type: 'error',
					        message: permission.message
					    });

					    this.$router.push('permission');
                    }

    				const child = await getPermissionChild({id:id});
    				if(child.status == 1){
    				   this.permissionData = child.data
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
							const res = await editPermission(this.id,this.formData);
							console.log(res);
							if (res.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '修改成功'
					          	});
					          	this.$router.push('permission')
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
