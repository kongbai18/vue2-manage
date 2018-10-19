<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>

					<el-submenu v-for="(item,key) in menu" :index='key+2'>
						<template slot="title">{{item.name}}</template>
						<el-menu-item  v-for="child in item.children" :index="child.controller_name">{{child.name}}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    import storage from '@/model/storage.js'

    export default {
        data(){
            return{
                menu:[],
            }
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		mounted(){
		    this.menu = storage.get('menu');
		}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
</style>
