const data = require('./mock/data.json')
const data2 = require('./mock/data2.json')
const order = require('./mock/order.json')
module.exports = () => ({
  getGoodsList: data.getGoodsList,
  getSimpleUser: data2.getSimpleUser,
  getGoodInfo: data2.getGoodInfo,
  getAddress: order.getAddress
});