/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 */

let baseUrl = '';
let routerMode = 'history';
let imgBaseUrl = 'http://images.cangdu.org/';
let formalname; // getStore('userId');
if (process.env.NODE_ENV === 'development') {
  formalname = 1
    // baseUrl = 'http://test.celelink.com/one_mall/backend/h5';
    // baseUrl = 'http://192.168.1.140:8000/one_mall/backend/h5';
} else if (process.env.NODE_ENV === 'production') {
  // baseUrl = 'http://test.celelink.com/one_mall/backend/h5';
  formalname = 0
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
  formalname
};
