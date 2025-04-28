import { IUser } from '@/types'
import Image from 'next/image'

const ProfileHero = ({ user }: { user: IUser }) => {
	return (
		<div className='h-44 relative bg-neutral-800'>
			{user.coverImage ? (
				<Image
					fill
					src={user.coverImage}
					alt={user.name}
					style={{ objectFit: 'cover' }}
				/>
			) : (
				<Image
					fill
					src={'/images/cover-placeholder.png'}
					alt={user.name}
					style={{ objectFit: 'cover' }}
				/>
			)}
		</div>
	)
}

export default ProfileHero
