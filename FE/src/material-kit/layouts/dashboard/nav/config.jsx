// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`../assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Overview',
    path: '/overview',
    icon: icon('ic_analytics'),
    access: 'all'
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
    access: 'all'
  },
  {
    title: 'user',
    path: '/users',
    icon: icon('ic_user'),
    access: 'admin'
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
