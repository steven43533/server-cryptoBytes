const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			virtuals: true,
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)
userSchema.virtual('fullName').get(function () {
	return this.firstName + ' ' + this.lastName
})

module.exports = mongoose.model('User', userSchema)
