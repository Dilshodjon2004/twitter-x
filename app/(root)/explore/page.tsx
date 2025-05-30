'use client'

import Header from '@/components/shared/header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { sliceText } from '@/lib/utils'
import { IUser } from '@/types'
import axios from 'axios'
import { Loader2, Search } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { debounce } from 'lodash'

const Page = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [allUser, setAllUsers] = useState<IUser[]>([])
	const [users, setUsers] = useState<IUser[]>([])

	const getAllUsers = async () => {
		try {
			const { data } = await axios.get('/api/users?limit=20')
			setAllUsers(data)
			setUsers(data)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getAllUsers()
	}, [])

	const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value.toLowerCase()

		if (text && text.length > 2) {
			setIsLoading(true)
			const { data } = await axios.get(`/api/users/search/${text}`)
			setUsers(data)
			setIsLoading(false)
		} else {
			setUsers(allUser)
			setIsLoading(false)
		}
	}

	const debouncedSearch = debounce(handleSearch, 500)

	return (
		<>
			<Header isBack label='Explore' />
			<div className='relative'>
				<Input
					placeholder='Search for users'
					className='mt-2 w-[98%] mx-auto block border-none bg-neutral-900 text-white'
					onChange={debouncedSearch}
				/>

				<div className='absolute rounded-md h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 right-2 top-1/2 -translate-y-1/2 cursor-pointer'>
					<Search className='text-white ' size={28} />
				</div>
			</div>

			{isLoading ? (
				<div className='flex justify-center items-center h-24'>
					<Loader2 className='animate-spin text-sky-500' />
				</div>
			) : (
				<>
					{' '}
					{users.length === 0 && (
						<div className='text-neutral-600 text-center p-6 text-xl'>
							No users found
						</div>
					)}
					<div className='grid grid-cols-1 lg:grid-cols-2 mt-6'>
						{users.map(user => (
							<Link href={`/profile/${user._id}`} key={user._id}>
								<div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative mr-4'>
									<div className='flex flex-row gap-4'>
										<Avatar>
											<AvatarImage src={user.profileImage} />
											<AvatarFallback>{user.name[0]}</AvatarFallback>
										</Avatar>

										<div className='flex flex-col'>
											<p className='text-white font-semibold cursor-pointer capitalize'>
												{user.name}
											</p>

											<span className='text-neutral-500 cursor-pointer md:block'>
												{user.username
													? `@${sliceText(user.username, 16)}`
													: sliceText(user.email, 16)}
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</>
			)}
		</>
	)
}

export default Page
