import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/dashboard', 'layout/layout.tsx', [index('pages/dashboard/index.tsx')]),
] satisfies RouteConfig;
