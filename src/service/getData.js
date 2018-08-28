import fetch from '../config/fetch.js';
import { getStore } from '../config/mUtils';

/**
 * 获取用户信息
 */
export const getUserInfo = (token) => fetch('../cum/backend/api/user/getUserInfo', {
  token
}, 'GET');

/**
 * 授权登录 userName = openId； 
 */
export const loginAPIUser = (userName, nickname, headPic, gender, refereeId) => fetch('../cum/backend/api/user/loginAPIUser', {
  userName,
  nickname,
  headPic,
  gender,
  refereeId
}, 'POST');

/**
 * 用户分享 type 0，二维码推荐APP，1，链接推荐商品
 */
export const postUserAction = (type, refereeId, remarks1) => fetch('../cum/backend/api/user/postUserAction', {
  type,
  refereeId,
  remarks1
}, 'POST');

/**
 * 签到  
 */
export const userSign = (token) => fetch('../cum/backend/api/user/userSign', {
  token
}, 'POST');

/**
 * 更新用户信息（以上参数需要修改什么传递什么 token必填）
 */
export const updateUser = (token, nickname, proId, cityId, regionId, address) => fetch('../cum/backend/api/user/updateUser', {
  token,
  nickname,
  proId,
  cityId,
  regionId,
  address
}, 'POST');

/**
 * 更新用户手机（以上参数需要修改什么传递什么 token必填）
 */
export const updatePhone = (token, phone) => fetch('../cum/backend/api/user/updatePhone', {
  token,
  phone
}, 'POST');

/**
 * 登录
 */
export const login = (userName, password) => fetch('../cum/backend/api/user/login', {
  userName,
  password
}, 'POST');

/**
 * 我的地址列表
 */
export const getUserAddressList = (token) => fetch('../cum/backend/api/address/getUserAddressList', {
  token
}, 'GET');

/**
 * 获取默认地址
 */
export const getCumUserDefaultAddress = (token) => fetch('../../cum/backend/api/address/getCumUserDefaultAddress', {
  token
}, 'GET');

/**
 * 地址详情
 */
export const getUserAddress = (id, token) => fetch('../cum/backend/api/address/getUserAddress', {
  id,
  token
}, 'GET');

/**
 * 添加地址/修改地址
 */
export const saveAddress = (id, name, mobile, proId, cityId, regionId, address, isDefault, token) => fetch('../cum/backend/api/address/saveCumUserAddress', {
  id,
  name,
  mobile,
  proId,
  cityId,
  regionId,
  address,
  isDefault,
  token
}, 'POST');

/**
 * 默认地址
 */
export const defaultAddress = (id, isDefault, token) => fetch('../cum/backend/api/address/updateAddressDefault', {
  id,
  isDefault,
  token
}, 'POST');
/**
 * 删除地址
 */
export const delAddress = (id, token) => fetch('../cum/backend/api/address/deleteCumUserAddress', {
  id,
  token
}, 'POST');

/**
 * 获取code信息
 */
export const getCode = () => fetch('../one_mall/backend/h5/weixin/getCode', {}, 'GET');

/**
 * 发起支付
 */
export const pay = (orderId, openId) => fetch('../../one_mall/backend/h5/weixin/pay', {
  orderId,
  openId
}, 'POST');


/**
 * 授权分享
 */
export const share = (url) => fetch('../one_mall/backend/h5/weixin/share', { url }, 'GET');

/**
 * 改变订单状态
 * orderStatus = 0 "待付款" 1 "待发货" 2 "待签收" 3 "待评价"; 4 "已完成"; 5 "已取消"; 6 "已删除"
 */
export const doOrderStatus = (orderId, orderStatus, userId) => fetch('../../one_mall/backend/h5/personal/doOrderStatus', {
  orderId,
  orderStatus,
  userId
}, 'POST');

/**
 * 收藏 relatedType =1商品 =2店铺
 */
export const doCollection = (userId, relatedId, relatedType) => fetch('../one_mall/backend/h5/personal/doCollection', {
  userId,
  relatedId,
  relatedType
}, 'POST');

/**
 * 取消收藏 
 */
export const delCollection = (userId, relatedId, relatedType) => fetch('../one_mall/backend/h5/personal/delCollection', {
  userId,
  relatedId,
  relatedType
}, 'POST');

/**
 * 收藏列表 relatedType =1商品 =2店铺
 */
export const getCollection = (userId, relatedType) => fetch('../one_mall/backend/h5/personal/getCollection', {
  userId,
  relatedType
}, 'GET');

/**
 * 搜索
 */
export const getSearch = (pageIndex, name) => fetch('../one_mall/backend/h5/goods/getSearch', {
  pageIndex,
  name
}, 'GET');

/**
 * 热搜列表
 */
export const getHot = () => fetch('../one_mall/backend/h5/goods/getHot', 'GET');

/**
 * 读取分类列表
 */
export const getClassfiyList = () => fetch('../one_mall/backend/h5/goods/getClassfiyList', 'GET');

/**
 * 读取小分类列表
 */
export const getClassList = () => fetch('../one_mall/backend/h5/goods/getClassList', 'GET');

/**
 * type读取商品列表
 */
export const getGoodsTypeList = (pageIndex, type) => fetch('../one_mall/backend/h5/goods/getGoodsList', {
  pageIndex,
  type
}, 'GET');

/**
 * 按照分类读取商品列表
 */
export const getGoodsList = (pageIndex, classificationId) => fetch('../one_mall/backend/h5/goods/getGoodsList', {
  pageIndex,
  classificationId
}, 'GET');

/**
 * 读取商品详情
 */
export const getGoodsById = (userId, goodsId) => fetch('../../../one_mall/backend/h5/goods/getGoodsById', {
  userId,
  goodsId
}, 'GET');

/**
 * 增加商品访问量
 */
export const doGoodsPV = (goodsId) => fetch('../../../one_mall/backend/h5/goods/doGoodsPV', {
  goodsId
}, 'GET');

/**
 * 获取商品的评价
 */
export const getGoodsEv = (id) => fetch('../../../one_mall/backend/h5/goods/getGoodsEv', {
  id
}, 'GET');

/**
 * 评价订单 描述：evaluateDesc, 描述相符：qualityScore ,快递评分： speedScore, 态度评分：attitudeScore, 满意评分：satisfactionScore
 */
export const doEvaluate = (userId, orderId, nickName, headPic, evaluateDesc, qualityScore, speedScore, attitudeScore, satisfactionScore) => fetch('../../../one_mall/backend/h5/goods/doEvaluate', {
  userId,
  orderId,
  evaluateDesc,
  qualityScore,
  speedScore,
  attitudeScore,
  satisfactionScore,
  nickName,
  headPic
}, 'POST');

/**
 * 删除图片
 */
export const delImg = (id) => fetch('../../../one_mall/backend/base/delImg', {
  id
}, 'POST');

/**
 * 保存足迹
 */
export const doFootprint = (userId, goodsId) => fetch('../../one_mall/backend/h5/goods/doFootprint', {
  userId,
  goodsId
}, 'POST');

/**
 * 读取足迹
 */
export const getFootprintList = (userId, pageIndex) => fetch('../one_mall/backend/h5/goods/getFootprintList', {
  userId,
  pageIndex
}, 'GET');

/**
 * 删除足迹
 */
export const delFoot = (userId, ids) => fetch('../one_mall/backend/h5/goods/delFoot', {
  userId,
  ids
}, 'POST');

/**
 * type =  1 关于我们 2 特别说明  3 全局link  4客服电话   
 */
export const getAbout = (type) => fetch('../../one_mall/backend/h5/personal/getAbout', {
  type
}, 'GET');

/**
 * 读取轮播图
 */
export const getADList = (pageSize) => fetch('../one_mall/backend/h5/personal/getAdList', {
  pageSize
}, 'GET');

/**
 * 我的购物车
 */
export const getShopCartList = (userId) => fetch('../one_mall/backend/h5/personal/getShopCartList', {
  userId
}, 'GET');

/**
 * 删除购物车商品
 */
export const delCart = (userId, goodsId) => fetch('../one_mall/backend/h5/personal/delCart', {
  userId,
  goodsId
}, 'POST');

/**
 * 我的购物车数量
 */
export const countCart = (userId) => fetch('../../../one_mall/backend/h5/personal/countCart', {
  userId
}, 'GET');
/**
 * 添加购物车
 */
export const doShopCart = (userId, goodsId, num) => fetch('../../../one_mall/backend/h5/personal/doShopCart', {
  userId,
  goodsId,
  num
}, 'POST');

/**
 * 协议
 */
export const getAgreement = (type) => fetch('../one_mall/backend/h5/personal/getAgreement', {
  type
}, 'GET');

/**
 * 下单
 */

export const doOrder = (token, userId, goodsId, num, orderActualMoney, addressId, remarks1, remarks2, remarks3) => fetch('../../one_mall/backend/h5/personal/doOrder', {
    token,
    userId,
    goodsId,
    num,
    orderActualMoney,
    addressId,
    remarks1,
    remarks2,
    remarks3
  },
  'POST');

/**
 * 批量下单
 */

export const doOrderData = (token, userId, goodsId, num, orderActualMoney, addressId, remarks1, sumMoney) => fetch('../../one_mall/backend/h5/personal/doOrderData', {
    token,
    userId,
    goodsId,
    num,
    orderActualMoney,
    addressId,
    remarks1,
    sumMoney
  },
  'POST');
/**
 * 我的订单
 * type = -1 "全部" 0 "待付款" 1 "待发货" 2 "待签收" 3 "待评价"; 4 "已完成"; 5 "已取消"; 6 "已删除";
 */

export const getOrderList = (userId, pageIndex, type) => fetch('../one_mall/backend/h5/personal/getOrderList', {
  userId,
  pageIndex,
  type
}, 'GET');

/**
 * 订单详情
 */
export const getOrderById = (id) => fetch('../one_mall/backend/h5/personal/getOrderById', {
  id
}, 'GET');

/**
 * 反馈
 */
export const doFeedback = (userId, goodsId) => fetch('../one_mall/backend/h5/personal/doFeedback', {
  userId,
  goodsId
}, 'POST');

/**
 * 读取消息列表
 */

export const getTiding = (userId) => fetch('../one_mall/backend/h5/personal/getTiding', {
  userId
}, 'GET');


/**
 * 读取消息反馈
 */
export const doTiding = (id) => fetch('../one_mall/backend/h5/personal/doTiding', {
  id
}, 'GET');

/**
 * 删除消息
 */
export const delTidingById = (id) => fetch('../one_mall/backend/h5/personal/delTidingById', {
  id
}, 'GET');

/**
 * 发送验证码
 */
export const phoneGetCode = (phone) => fetch('../one_mall/backend/h5/personal/getCode', {
  phone
}, 'GET');





























/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});
/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
});
/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
});
/**
 * 获取当前所在城市
 */

export const currentcity = number => fetch('/v1/cities/' + number);
/**
 * 获取搜索地址
 */
export const searchplace = (cityid, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword: value
});
/**
 * 获取msite页面地址信息
 */

export const msiteAdress = geohash => fetch('/v2/pois/' + geohash);
/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
});
/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };
  return fetch('/shopping/restaurants', data);
};

/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
  'extras[]': 'restaurant_activity',
  geohash,
  keyword,
  type: 'search'
});

/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
  latitude,
  longitude
});

/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
  latitude,
  longitude,
  kw: ''
});

/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
  latitude,
  longitude,
  kw: ''
});

/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
  latitude,
  longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});

/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
  restaurant_id
});

/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
  has_content: true,
  offset,
  limit: 10,
  tag_name
});

/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');

/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');

/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms'
}, 'POST');

/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST');

/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
  [type]: checkNumber,
  type
});

/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
  action: 'send',
  captcha_code,
  [type]: sendData,
  type: 'sms',
  way: type,
  password
}, 'POST');

/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
  come_from: 'web',
  geohash,
  entities,
  restaurant_id: shopid
}, 'POST');

/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
  sig
});

/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => fetch('/v1/carts/' + id + '/addresses', {
  sig
});

/**
 * 搜索地址
 */

export const searchNearby = keyword => fetch('/v1/pois', {
  type: 'nearby',
  keyword
});

/**
 * 重新发送订单验证码
 */

export const rePostVerify = (cart_id, sig, type) => fetch('/v1/carts/' + cart_id + '/verify_code', {
  sig,
  type
}, 'POST');

/**
 * 重新发送订单验证码
 */

export const payRequest = (merchantOrderNo, userId) => fetch('/payapi/payment/queryOrder', {
  merchantId: 5,
  merchantOrderNo,
  source: 'MOBILE_WAP',
  userId,
  version: '1.0.0'
});

/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');

/**
 *兑换会员卡
 */

export const vipCart = (id, number, password) => fetch('/member/v1/users/' + id + '/delivery_card/physical_card/bind', {
  number,
  password
}, 'POST');

/**
 * 获取红包
 */

export const getHongbaoNum = id => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');

/**
 * 获取过期红包
 */

export const getExpired = id => fetch('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');

/**
 * 兑换红包
 */

export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/v1/users/' + id + '/hongbao/exchange', {
  exchange_code,
  captcha_code
}, 'POST');

/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {
  user_id: getStore('user_id')
});

/**
 *个人中心里编辑地址
 */

export const getAddressList = (user_id) => fetch('/v1/users/' + user_id + '/addresses');

/**
 *个人中心里搜索地址
 */

export const getSearchAddress = (keyword) => fetch('v1/pois', {
  keyword: keyword,
  type: 'nearby'
});

/**
 * 删除地址
 */

export const deleteAddress = (userid, addressid) => fetch('/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {
  username,
  password,
  captcha_code
}, 'POST');

/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');
