import mongoose, { ConnectOptions } from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true)

	if (!process.env.MONGO_URI) {
		return console.log('Mongo URI not found')
	}

	if (isConnected) {
		return
	}

	try {
		const options: ConnectOptions = {
			dbName: 'twitter-x',
			autoCreate: true,
		}

		await mongoose.connect(process.env.MONGO_URI, options)
		isConnected = true
		console.log('MongoDB connected!')
	} catch (error) {
		console.log('MongoDB connection error!')
	}
}
