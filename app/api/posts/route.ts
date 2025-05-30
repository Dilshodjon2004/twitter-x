import Post from '@/database/post.model'
import User from '@/database/user.model'
import { authOptions } from '@/lib/auth-options'
import { connectToDatabase } from '@/lib/mongoose'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		await connectToDatabase()
		const { body, userId } = await req.json()

		const post = await Post.create({ body, user: userId })
		return NextResponse.json(post)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function GET(req: Request) {
	try {
		await connectToDatabase()
		const { searchParams } = new URL(req.url)
		const limit = searchParams.get('limit')

		// @typescript-eslint/no-explicit-any
		const { currentUser }: any = await getServerSession(authOptions)

		const posts = await Post.find({})
			.populate({
				path: 'user',
				model: User,
				select: 'name email profileImage _id username',
			})
			.limit(Number(limit))
			.sort({ createdAt: -1 })

		const filteredPosts = posts.map(post => ({
			_id: post._id,
			body: post.body,
			createdAt: post.createdAt,
			user: {
				name: post.user.name,
				email: post.user.email,
				profileImage: post.user.profileImage,
				_id: post.user._id,
				username: post.user.username,
			},
			likes: post.likes.length,
			comments: post.comments.length,
			hasLiked: post.likes.includes(currentUser._id),
		}))

		return NextResponse.json(filteredPosts)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function DELETE(req: Request) {
	try {
		await connectToDatabase()
		const { postId } = await req.json()

		await Post.findOneAndDelete(postId)

		return NextResponse.json({ message: 'Post deleted successfully' })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
