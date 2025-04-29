'use client'
import { sliceText } from '@/lib/utils'
import { IPost, IUser } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatDistanceToNowStrict } from 'date-fns'
import { AiFillDelete, AiOutlineMessage } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
	post: IPost
	user: IUser
	setPosts: Dispatch<SetStateAction<IPost[]>>
}

const PostItem = ({ post, user, setPosts }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const router = useRouter()

	// @typescript-eslint/no-explicit-any
	const onDelete = async (e: any) => {
		e.stopPropagation()
		try {
			setIsLoading(true)
			await axios.delete('/api/posts', {
				data: { postId: post._id },
			})
			setPosts((prev: IPost[]) => prev.filter(p => p._id !== post._id))
			toast({
				title: 'Success',
				description: 'Post deleted successfully!',
			})
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
			toast({
				title: 'Error',
				description: 'Something went wrong. Please try again later.',
				variant: 'destructive',
			})
		}
	}

	// @typescript-eslint/no-explicit-any
	const onLike = async (e: any) => {
		e.stopPropagation()
		try {
			setIsLoading(true)
			if (post.hasLiked) {
				// delete like
				await axios.delete('/api/likes', {
					data: {
						postId: post._id,
						userId: user._id,
					},
				})

				const updatedPosts = { ...post, hasLiked: false, likes: post.likes - 1 }

				setPosts((prev: IPost[]) =>
					prev.map(p => (p._id === post._id ? updatedPosts : p))
				)
			} else {
				await axios.put('/api/likes', {
					postId: post._id,
					userId: user._id,
				})

				const updatedPosts = { ...post, hasLiked: true, likes: post.likes + 1 }
				setPosts((prev: IPost[]) =>
					prev.map(p => (p._id === post._id ? updatedPosts : p))
				)
			}

			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
			toast({
				title: 'Error',
				description: 'Something went wrong. Please try again later.',
				variant: 'destructive',
			})
		}
	}

	const goToPost = () => {
		router.push(`/posts/${post._id}`)
	}

	// @typescript-eslint/no-explicit-any
	const goToProfile = (evt: any) => {
		evt.stopPropagation()
		router.push(`/profile/${post.user._id}`)
	}
	return (
		<div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative'>
			{isLoading && (
				<div className='absolute inset-0 w-full h-full bg-black opacity-70 z-[2]'>
					<div className='flex justify-center items-center h-full'>
						<Loader2 className='animate-spin text-sky-500' />
					</div>
				</div>
			)}
			<div
				className='flex flex-row items-center gap-3 cursor-pointer'
				onClick={goToPost}
			>
				<Avatar onClick={goToProfile}>
					<AvatarImage src={post.user.profileImage} />
					<AvatarFallback>{post.user.name[0]}</AvatarFallback>
				</Avatar>

				<div>
					<div
						className='flex flex-row items-center gap-2'
						onClick={goToProfile}
					>
						<p className='text-white font-semibold hover:underline cursor-pointer'>
							{post.user.name}
						</p>
						<span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
							{post.user.username
								? `@${sliceText(post.user.username, 16)}`
								: sliceText(post.user.email, 16)}
						</span>
						<span className='text-neutral-500 text-sm'>
							{formatDistanceToNowStrict(new Date(post.createdAt))} ago
						</span>
					</div>

					<div className='text-white mt-1'>{post.body}</div>

					<div className='flex flex-row items-center mt-3 gap-10'>
						<div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
							<AiOutlineMessage size={20} />
							<p>{post.comments || 0}</p>
						</div>
						<div
							className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
							onClick={onLike}
						>
							<FaHeart size={20} color={post.hasLiked ? 'red' : ''} />
							<p>{post.likes || 0}</p>
						</div>
						{post.user._id === user._id && (
							<div
								className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
								onClick={onDelete}
							>
								<AiFillDelete size={20} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostItem
