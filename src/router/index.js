import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const goods = r => require.ensure([], () => r(require('@/page/goods/goods/goods')), 'goods');
const addGoods = r => require.ensure([], () => r(require('@/page/goods/goods/addGoods')), 'addGoods');
const editGoods = r => require.ensure([], () => r(require('@/page/goods/goods/editGoods')), 'editGoods');
const category = r => require.ensure([], () => r(require('@/page/goods/category/category')), 'category');
const addCategory = r => require.ensure([], () => r(require('@/page/goods/category/addCategory')), 'addCategory');
const editCategory = r => require.ensure([], () => r(require('@/page/goods/category/editCate')), 'editCategory');
const delivery = r => require.ensure([], () => r(require('@/page/goods/delivery/delivery')), 'delivery');
const addDelivery = r => require.ensure([], () => r(require('@/page/goods/delivery/addDelivery')), 'addDelivery');
const editDelivery = r => require.ensure([], () => r(require('@/page/goods/delivery/editDelivery')), 'editDelivery');
const article = r => require.ensure([], () => r(require('@/page/shopList')), 'article');
const articlecate = r => require.ensure([], () => r(require('@/page/foodList')), 'articlecate');
const model = r => require.ensure([], () => r(require('@/page/orderList')), 'model');
const furniture = r => require.ensure([], () => r(require('@/page/adminList')), 'furniture');
const permission = r => require.ensure([], () => r(require('@/page/admin/permissionList')), 'permission');
const role = r => require.ensure([], () => r(require('@/page/admin/roleList')), 'role');
const addRole = r => require.ensure([], () => r(require('@/page/admin/addRole')), 'addRole');
const editRole = r => require.ensure([], () => r(require('@/page/admin/editRole')), 'editRole');
const admin = r => require.ensure([], () => r(require('@/page/admin/adminList')), 'admin');
const addAdmin = r => require.ensure([], () => r(require('@/page/admin/addAdmin')), 'addAdmin');
const editAdmin = r => require.ensure([], () => r(require('@/page/admin/editAdmin')), 'editAdmin');
const addPermission = r => require.ensure([], () => r(require('@/page/admin/addPermission')), 'addPermission');
const editPermission = r => require.ensure([], () => r(require('@/page/admin/editPermission')), 'editPermission');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/goods',
			component: goods,
			meta: ['商品管理', '商品列表'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['商品列表', '添加商品'],
		},{
			path: '/editGoods',
			component: editGoods,
			meta: ['商品列表', '修改商品'],
		},{
			path: '/category',
			component: category,
			meta: ['商品管理', '商品分类'],
		},{
			path: '/addCategory',
			component: addCategory,
			meta: ['商品分类', '添加分类'],
		},{
			path: '/editCategory',
			component: editCategory,
			meta: ['商品分类', '修改分类'],
		},{
			path: '/delivery',
			component: delivery,
			meta: ['商品管理', '配送管理'],
		},{
			path: '/addDelivery',
			component: addDelivery,
			meta: ['配送管理', '添加配送'],
		},{
			path: '/editDelivery',
			component: editDelivery,
			meta: ['配送管理', '修改配送'],
		},{
			path: '/article',
			component: article,
			meta: ['分享管理', '文章列表'],
		},{
			path: '/articlecate',
			component: articlecate,
			meta: ['分享管理', '文章分类'],
		},{
			path: '/model',
			component: model,
			meta: ['报价管理', '模型列表'],
		},{
			path: '/furniture',
			component: furniture,
			meta: ['报价管理', '家具列表'],
		},{
			path: '/permission',
			component: permission,
			meta: ['管理员管理', '权限列表'],
		},{
			path: '/addPermission',
			component: addPermission,
			meta: ['管理员管理', '添加权限节点'],
		},{
			path: '/editPermission',
			component: editPermission,
			meta: ['管理员管理', '修改权限节点'],
		},{
			path: '/role',
			component: role,
			meta: ['管理员管理', '角色管理'],
		},{
			path: '/addRole',
			component: addRole,
			meta: ['管理员管理', '添加角色'],
		},{
			path: '/editRole',
			component: editRole,
			meta: ['管理员管理', '修改角色'],
		},{
			path: '/admin',
			component: admin,
			meta: ['管理员管理', '管理员列表'],
		},{
			path: '/addAdmin',
			component: addAdmin,
			meta: ['管理员管理', '添加管理员'],
		},{
			path: '/editAdmin',
			component: editAdmin,
			meta: ['管理员管理', '修改管理员'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
