'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'

export async function getUserById(userId: string) {
	try {
		await connectToDatabase()

		const user = await User.findById(userId)

		const filteredUser = {
			_id: user._id,
			name: user.name,
			email: user.email,
			coverImage: user.coverImage,
			profileImage: user.profileImage,
			username: user.username,
			bio: user.bio,
			location: user.location,
			createdAt: user.createdAt,
			followers: user.followers?.length,
			following: user.following?.length,
		}

		return filteredUser
	} catch (error) {
		throw error
	}
}
