'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth-options'

export async function getUserById(userId: string) {
	try {
		await connectToDatabase()

		const user = await User.findById(userId)
		// @typescript-eslint/no-explicit-any
		const { currentUser }: any = await getServerSession(authOptions)

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
			isFollowing: user.followers?.includes(currentUser._id) || false,
		}

		return filteredUser
	} catch (error) {
		throw error
	}
}
