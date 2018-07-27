const data = require('./mock/data.json')
const data2 = require('./mock/data2.json')
const home = require('./mock/home.json');
const shop = require('./mock/shop.json');
module.exports = () => ({
  getGoodsList: data.getGoodsList,
  getSimpleUser: data2.getSimpleUser,
  getGoodInfo: data2.getGoodInfo,
  newApi: home.newApi,
  getShopGood:shop.getShopGood,
  getShopGoodInfo:shop.getShopGoodInfo
});
