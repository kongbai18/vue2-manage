import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/platformmgmt/v1/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/platformmgmt/v1/logout');

/**
 * 上传
 */

export const upload = () => fetch('/platformmgmt/v1/upload',{},'POST');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/platformmgmt/v1/getAdminData');

/**
 * 获取权限列表
 */

export const permissionList = () => fetch('/platformmgmt/v1/permission');

/**
 * 添加权限节点
 */

export const addPermission = data => fetch('/platformmgmt/v1/permission', data, 'POST');

/**
 * 获取权限节点信息
 */

export const getPermissionData = id => fetch('/platformmgmt/v1/permission/'+id, {}, 'GET');

/**
 * 获取非子集节点信息
 */

export const getPermissionChild = data => fetch('/platformmgmt/v1/permission/getChild', data, 'POST');

/**
 * 修改权限节点
 */

export const editPermission = (id,data) => fetch('/platformmgmt/v1/permission/'+id+'/edit', data, 'GET');

/**
 * 删除权限节点
 */

export const deletePermission = id => fetch('/platformmgmt/v1/permission/'+id,{}, 'DELETE');

/**
 * 获取角色列表
 */

export const roleList = () => fetch('/platformmgmt/v1/role');

/**
 * 添加角色
 */

export const addRole = data => fetch('/platformmgmt/v1/role', data, 'POST');

/**
 * 获取角色信息
 */

export const getRoleInfo = id => fetch('/platformmgmt/v1/role/'+id, {}, 'GET');

/**
 * 修改角色
 */

export const editRole = (id,data) => fetch('/platformmgmt/v1/role/'+id+'/edit', data, 'GET');

/**
 * 删除角色
 */

export const deleteRole = id => fetch('/platformmgmt/v1/role/'+id,{}, 'DELETE');

/**
 * 获取管理员列表
 */

export const adminList = () => fetch('/platformmgmt/v1/admin');

/**
 * 添加管理员
 */

export const addAdmin = data => fetch('/platformmgmt/v1/admin', data, 'POST');

/**
 * 获取管理员信息
 */

export const getAdminData = id => fetch('/platformmgmt/v1/admin/'+id, {}, 'GET');

/**
 * 修改管理员
 */

export const editAdmin = (id,data) => fetch('/platformmgmt/v1/admin/'+id+'/edit', data, 'GET');

/**
 * 删除管理员
 */

export const deleteAdmin = id => fetch('/platformmgmt/v1/admin/'+id,{}, 'DELETE');

/**
 * 设置管理员状态
 */

export const setStatus = data => fetch('/platformmgmt/v1/setStatus',data,'POST');

/**
 * 获取商品分类列表
 */

export const categoryList = () => fetch('/platformmgmt/v1/category');

/**
 * 添加商品分类
 */

export const addCategory = data => fetch('/platformmgmt/v1/category', data, 'POST');

/**
 * 获取商品分类信息
 */

export const getCategoryData = id => fetch('/platformmgmt/v1/category/'+id, {}, 'GET');

/**
 * 修改商品分类
 */

export const editCategory = (id,data) => fetch('/platformmgmt/v1/category/'+id+'/edit', data, 'GET');

/**
 * 删除商品分类
 */

export const deleteCategory = id => fetch('/platformmgmt/v1/category/'+id,{}, 'DELETE');

/**
 * 获取非子集节点信息
 */

export const getCategoryChild = data => fetch('/platformmgmt/category/getChild', data, 'POST');

/**
 * 获取配送模板列表
 */

export const deliveryList = () => fetch('/platformmgmt/v1/delivery');

/**
 * 添加配送模板
 */

export const addDelivery = data => fetch('/platformmgmt/v1/delivery', data, 'POST');

/**
 * 获取配送模板信息
 */

export const getDeliveryData = id => fetch('/platformmgmt/v1/delivery/'+id, {}, 'GET');

/**
 * 修改配送模板
 */

export const editDelivery = (id,data) => fetch('/platformmgmt/v1/delivery/'+id+'/edit', data, 'GET');

/**
 * 删除配送模板
 */

export const deleteDelivery = id => fetch('/platformmgmt/v1/delivery/'+id,{}, 'DELETE');


/**
 * 获取商品列表
 */

export const goodsList = () => fetch('/platformmgmt/v1/goods');

/**
 * 添加商品
 */

export const addGoods = data => fetch('/platformmgmt/v1/goods', data, 'POST');

/**
 * 获取商品信息
 */

export const getGoodsData = id => fetch('/platformmgmt/v1/goods/'+id, {}, 'GET');

/**
 * 修改商品
 */

export const editGoods = (id,data) => fetch('/platformmgmt/v1/goods/'+id+'/edit', data, 'GET');

/**
 * 删除商品
 */

export const deleteGoods = id => fetch('/platformmgmt/v1/goods/'+id,{}, 'DELETE');

/**
 * 添加商品规格
 */

export const addSpec = data => fetch('/platformmgmt/v1/addSpec', data, 'POST');


/**
 * 获取商品分类列表
 */

export const articleCateList = () => fetch('/platformmgmt/v1/articleCate');

/**
 * 添加商品分类
 */

export const addArticleCate = data => fetch('/platformmgmt/v1/articleCate', data, 'POST');

/**
 * 获取商品分类信息
 */

export const getArticleCateData = id => fetch('/platformmgmt/v1/articleCate/'+id, {}, 'GET');

/**
 * 修改商品分类
 */

export const editArticleCate = (id,data) => fetch('/platformmgmt/v1/articleCate/'+id+'/edit', data, 'GET');

/**
 * 删除商品分类
 */

export const deleteArticleCate = id => fetch('/platformmgmt/v1/articleCate/'+id,{}, 'DELETE');

/**
 * 获取非子集节点信息
 */

export const getArticleCateChild = data => fetch('/platformmgmt/articleCate/getChild', data, 'POST');

/**
 * 获取文章列表
 */

export const articleList = () => fetch('/platformmgmt/v1/article');

/**
 * 添加文章
 */

export const addArticle = data => fetch('/platformmgmt/v1/article', data, 'POST');

/**
 * 获取文章信息
 */

export const getArticleData = id => fetch('/platformmgmt/v1/article/'+id, {}, 'GET');

/**
 * 修改文章
 */

export const editArticle = data => fetch('/platformmgmt/v1/article/edit', data, 'POST');

/**
 * 删除文章
 */

export const deleteArticle = id => fetch('/platformmgmt/v1/article/'+id,{}, 'DELETE');