const data = require('./mock/data.json')
const data2 = require('./mock/data2.json')
const order = require('./mock/order.json')
const shopcar = require('./mock/shopcar.json')
const home = require('./mock/home.json');
const shop = require('./mock/shop.json');
module.exports = () => ({
  getGoodsList: data.getGoodsList,
  getSimpleUser: data2.getSimpleUser,
  getGoodInfo: data2.getGoodInfo,
  getAddress: order.getAddress,
  getOrderGoodsList:order.getOrderGoodsList,
  
  getRecommendGoods:shopcar.getRecommendGoods,

  newApi: home.newApi,
  getShopGood:shop.getShopGood,
  getShopGoodInfo:shop.getShopGoodInfo
});
