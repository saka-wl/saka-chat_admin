import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '登陆',
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '注册',
      path: '/enroll',
      component: './Enroll',
      layout: false,
    },
  ],
  npmClient: 'pnpm',
});
