'use client'
import { IUser } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { sliceText } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '../ui/button'
import { useState } from 'react'
import axios from 'axios'

interface Props {
	user: IUser
	onChangeFollowing?: (user: IUser) => void
	isFollow?: boolean
	following?: IUser[]
}

const User = ({ user, onChangeFollowing, isFollow, following }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	// @typescript-eslint/no-explicit-any
	const { data: session }: any = useSession()
	const router = useRouter()

	const onFollow = async () => {
		try {
			setIsLoading(true)
			await axios.put(`/api/follows`, {
				userId: user._id,
				currentUserId: session.currentUserId._id,
			})
			const updatedFollowing = [...(following as IUser[]), user]
			// @typescript-eslint/no-unused-expressions
			onChangeFollowing && onChangeFollowing(updatedFollowing)
			router.refresh()
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const onUnfollow = async () => {}

	return (
		<div className='flex justify-between items-center gap-3 cursor-pointer hover:bg-neutral-300/30 hover:bg-opacity-10 transition py-2 px-3 rounded-md'>
			<div className='flex gap-2 cursor-pointer'>
				<Avatar>
					<AvatarImage src={user.profileImage} />
					<AvatarFallback>{user.name[0]}</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<p className='text-white font-semibold text-sm line-clamp-1'>
						{user.name}
					</p>
					<p className='text-neutral-400 text-sm line-clamp-1'>
						{user.username
							? `@${sliceText(user.username, 16)}`
							: sliceText(user.email, 16)}
					</p>
				</div>
			</div>

			{isFollow && user._id !== session?.currentUser._id ? (
				<>
					{user.followers.includes(session?.currentUser?._id) ? (
						<Button
							label={'Unfollow'}
							outline
							classNames='h-[30px] p-0 w-fit px-3 text-sm'
							disabled={isLoading}
							onClick={onUnfollow}
						/>
					) : (
						<Button
							label={'Follow'}
							outline
							classNames='h-[30px] p-0 w-fit px-3 text-sm'
							disabled={isLoading}
							onClick={onFollow}
						/>
					)}
				</>
			) : null}
		</div>
	)
}

export default User
