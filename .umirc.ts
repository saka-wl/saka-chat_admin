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
      access: 'normal',
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
    {
      name: '用户权限控制',
      path: '/loginControl',
      component: './LoginControl',
      access: 'normal',
    },
  ],
  npmClient: 'pnpm',
});
