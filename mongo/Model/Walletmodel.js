var mongoose =  require('mongoose');
  //  modelName = 'deploymentmodel',
	schemaDefinition = require('../schema/Walletschema'),
schemaInstance = mongoose.Schema(schemaDefinition),
modelInstance = mongoose.model('Walletmodel', schemaInstance);
module.exports = modelInstance;

