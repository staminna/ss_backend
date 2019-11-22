/*
 * Should we want to import the api into local database, then we would use this Schema model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicySchema = new Schema({
	Id: {
    type: String
  },
	amountInsured: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
		trim: true
	},

	clientId: {
		type: String,
		required: true,
	},
	inceptionDate: {
		type: Date,
	},
	installmentPayment: {
			type: Boolean
	}
})

const Policy = mongoose.model('Policy', PolicySchema)

module.exports = Policy;