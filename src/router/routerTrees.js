import React from 'react';
export default [
  {
    key: 'login',
    path: '/',
    loader: () => import('../views/login'),
  },
  {
    key: 'home',
    path: '/home',
    loader: () => import('../views/home/index'),
  },
];
