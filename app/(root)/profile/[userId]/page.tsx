import ProfileBio from '@/components/profile/profile-bio'
import ProfileHero from '@/components/profile/profile-hero'
import Header from '@/components/shared/header'
import { getUserById } from '@/lib/actions/user.action'
import { IUser } from '@/types'
import React from 'react'

const Page = async ({ params }: { params: { userId: string } }) => {
	const user: IUser = await getUserById(params.userId)

	return (
		<>
			<Header label={user.name} isBack />
			<ProfileHero user={JSON.parse(JSON.stringify(user))} />
			<ProfileBio
				user={JSON.parse(JSON.stringify(user))}
				userId={params.userId}
			/>
		</>
	)
}

export default Page
