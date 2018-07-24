const data = require('./mock/data.json')
const data2 = require('./mock/data2.json')
const shopcar = require('./mock/shopcar.json')
module.exports = () => ({
  getGoodsList: data.getGoodsList,
  getSimpleUser: data2.getSimpleUser,
  getGoodInfo: data2.getGoodInfo,
  getShopCarGoods: shopcar.getShopCarGoods,
<<<<<<< HEAD
  getRecommendGoods:shopcar.getRecommendGoods,
  killGoods:data.killGoodsList,
  newApi: home.newApi
});
=======
  getRecommendGoods:shopcar.getRecommendGoods
});
>>>>>>> 8dbfd2b39f1ccf46b44978d3690c7048267b1068
