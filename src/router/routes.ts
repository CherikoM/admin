import { RouteRecordRaw } from 'vue-router'

/**
 * 常量路由
 */
export const constantRoute: RouteRecordRaw[] = [
  // 登录
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  // 首页
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    redirect: 'home',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/pages/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  // 数据
  {
    path: '/screen',
    component: () => import('@/pages/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据',
      hidden: false,
      icon: 'Platform',
    },
  },
  // 404
  {
    path: '/404',
    component: () => import('@/pages/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

/**
 * 异步路由
 */
export const asyncRoute: RouteRecordRaw[] = [
  // 权限管理
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/pages/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/pages/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'List',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/pages/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Grid',
        },
      },
    ],
  },
  // 商品管理
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/pages/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/pages/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'SetUp',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/pages/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Memo',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/pages/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Memo',
        },
      },
    ],
  },
]

/**
 * 任意路由
 */
export const anyRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'any',
  meta: {
    title: '任意路由',
    hidden: true,
  },
}
