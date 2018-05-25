
module.exports.id = '33.7529dc22.ee9104';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow 7529dc22.ee9104 update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({'path':'7529dc22.ee9104','type':'flows'}, {
    $set: {'path':'7529dc22.ee9104','body':[{'id':'8a285563.64b8e8','type':'http in','z':'7529dc22.ee9104','name':'get wallets','url':'/wallet/:owner','method':'get','upload':false,'swaggerDoc':'','x':140,'y':120,'wires':[['2166d8eb.c97448']]},{'id':'2166d8eb.c97448','type':'function','z':'7529dc22.ee9104','name':'prepare request','func':'const prefix = global.get(\'settings.mongo.collectionPrefix\');\n\n\nmsg.payload = {\n    model: `${prefix}WalletExchange`, \n    request: {\n       owner: msg.req.params.owner\n       }\n};\n\n\nreturn msg;','outputs':1,'noerr':0,'x':320,'y':120,'wires':[['72a26dc1.6cf634']]},{'id':'72a26dc1.6cf634','type':'mongo','z':'7529dc22.ee9104','model':'','request':'{}','options':'{}','name':'mongo','mode':'1','requestType':'0','dbAlias':'primary.data','x':498.94091033935547,'y':119.00345039367676,'wires':[['a271c94.f8d3738']]},{'id':'30891a36.3c38a6','type':'http response','z':'7529dc22.ee9104','name':'','statusCode':'','headers':{},'x':882.9999923706055,'y':118.4583740234375,'wires':[]},{'id':'a271c94.f8d3738','type':'function','z':'7529dc22.ee9104','name':'format response','func':'msg.payload = msg.payload.map(item=>({\n    address: item.address,\n    operations: item.operations,\n    created: item.created\n}));\n\nreturn msg;','outputs':1,'noerr':0,'x':674.0069046020508,'y':119.23611259460449,'wires':[['30891a36.3c38a6']]},{'id':'97272e7c.e916c','type':'http in','z':'7529dc22.ee9104','name':'get secret','url':'/wallet/:wallet','method':'post','upload':false,'swaggerDoc':'','x':140,'y':220,'wires':[['73663853.c561e8']]},{'id':'73663853.c561e8','type':'function','z':'7529dc22.ee9104','name':'prepare request','func':'const prefix = global.get(\'settings.mongo.collectionPrefix\');\nconst EthCrypto = global.get(\'libs.EthCrypto\');\n\nmsg.pubkey = msg.payload.pubkey;\nconst address = EthCrypto.publicKey.toAddress(msg.pubkey).toLowerCase();\n\n\nmsg.payload = {\n    model: `${prefix}WalletExchange`, \n    request: {\n       address: msg.req.params.wallet,\n       owner: address\n       }\n};\n\n\nreturn msg;','outputs':1,'noerr':0,'x':310.01734924316406,'y':220,'wires':[['c183dfcf.a6a']]},{'id':'c183dfcf.a6a','type':'mongo','z':'7529dc22.ee9104','model':'','request':'{}','options':'{}','name':'mongo','mode':'1','requestType':'0','dbAlias':'primary.data','x':490,'y':220,'wires':[['18abf226.5f7b2e']]},{'id':'63cfc5e8.024d0c','type':'http response','z':'7529dc22.ee9104','name':'','statusCode':'','headers':{},'x':862.076416015625,'y':219.45492362976074,'wires':[]},{'id':'18abf226.5f7b2e','type':'async-function','z':'7529dc22.ee9104','name':'pack data','func':'const EthCrypto = global.get(\'libs.EthCrypto\');\n\n\nif(!msg.payload.length){\n    msg.payload = {msg: \'wallet not found\'};\n    return msg;\n}\n\nconst exchange = msg.payload[0];\n\nconst address = EthCrypto.publicKey.toAddress(msg.pubkey).toLowerCase();\n \n node.warn(address);\n  \nif(exchange.owner !== address){\n    msg.payload = {msg: \'wrong pubkey provided\'};\n    return msg;\n}\n\n\nmsg.payload = await EthCrypto.encryptWithPublicKey(msg.pubkey, exchange.secret);\n\n\nreturn msg;','outputs':1,'noerr':1,'x':673.2986679077148,'y':220.8577070236206,'wires':[['63cfc5e8.024d0c']]},{'id':'2656f1a2.b9812e','type':'http in','z':'7529dc22.ee9104','name':'confirm operation','url':'/wallet/:wallet/confirm','method':'post','upload':false,'swaggerDoc':'','x':160,'y':320,'wires':[['7d9b12e1.c7d99c']]},{'id':'7d9b12e1.c7d99c','type':'function','z':'7529dc22.ee9104','name':'prepare request','func':'const prefix = global.get(\'settings.mongo.collectionPrefix\');\n\nmsg.token = msg.payload.token;\nmsg.operation = msg.payload.operation;\n\n\n\nmsg.payload = {\n    model: `${prefix}WalletExchange`, \n    request: {\n       address: msg.req.params.wallet\n       }\n};\n\n\nreturn msg;','outputs':1,'noerr':0,'x':400,'y':320,'wires':[['59702001.d40d4']]},{'id':'59702001.d40d4','type':'mongo','z':'7529dc22.ee9104','model':'','request':'{}','options':'{}','name':'mongo','mode':'1','requestType':'0','dbAlias':'primary.data','x':579.9826507568359,'y':320,'wires':[['28c420ff.53e65','8937e3e4.b902a','ff7c127b.b90f6']]},{'id':'4146a4a.53ebb5c','type':'http response','z':'7529dc22.ee9104','name':'','statusCode':'','headers':{},'x':952.0590667724609,'y':319.45492362976074,'wires':[]},{'id':'28c420ff.53e65','type':'async-function','z':'7529dc22.ee9104','name':'pack data','func':'const speakeasy = global.get(\'libs.speakeasy\');\nconst factories = global.get("factories"); \nconst provider = global.get("settings.web3.provider"); \nconst contracts = global.get("contracts"); \nconst OracleWallet = global.get("settings.web3.wallet"); \nconst oracleAddress = OracleWallet.getAddressString();\n\n\ncontracts.Wallet.setProvider(provider);\n\n\nif(!msg.payload.length){\n    msg.payload = {msg: \'wallet not found\'};\n    return msg;\n}\n\nconst wallet = msg.payload[0];\n\nconst tokenValidated = speakeasy.totp.verify({\n  secret: wallet.secret,\n  encoding: \'base32\',\n  token: msg.token,\n  window: 6\n});\n \nif(!tokenValidated){\n    msg.payload = {msg: \'wrong token provided\'};\n    return msg;\n}\n\nconst walletInstance = contracts.Wallet.at(wallet.address);\nconst wallectConfirmedTx = await walletInstance.confirm(msg.operation, {from: oracleAddress, gas: 570000});\n\n//msg.payload = factories.messages.generic.success;\nmsg.payload = wallectConfirmedTx;\n\n\nreturn msg;','outputs':1,'noerr':1,'x':763.2813186645508,'y':320.8577070236206,'wires':[['4146a4a.53ebb5c','8937e3e4.b902a']]},{'id':'56c5b1.41d80a5','type':'catch','z':'7529dc22.ee9104','name':'','scope':null,'x':144,'y':439,'wires':[['c2ea95e1.71cb28','7c879840.988578']]},{'id':'c2ea95e1.71cb28','type':'debug','z':'7529dc22.ee9104','name':'','active':true,'console':'false','complete':'error','x':305.06944274902344,'y':522.5694961547852,'wires':[]},{'id':'8937e3e4.b902a','type':'debug','z':'7529dc22.ee9104','name':'','active':true,'console':'false','complete':'false','x':950,'y':460,'wires':[]},{'id':'c2e70635.e98c38','type':'http response','z':'7529dc22.ee9104','name':'','statusCode':'','headers':{},'x':490,'y':440,'wires':[]},{'id':'7c879840.988578','type':'function','z':'7529dc22.ee9104','name':'','func':'const factories = global.get("factories"); \n\nmsg.payload = factories.messages.generic.fail;\nreturn msg;\n','outputs':1,'noerr':0,'x':315.07984924316406,'y':440.24308013916016,'wires':[['c2e70635.e98c38']]},{'id':'ff7c127b.b90f6','type':'debug','z':'7529dc22.ee9104','name':'','active':true,'console':'false','complete':'operation','x':982.6319427490234,'y':366.5729446411133,'wires':[]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({'path':'7529dc22.ee9104','type':'flows'}, done);
};
