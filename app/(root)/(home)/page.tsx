import Auth from '@/components/auth'

export default function HomePage() {
	const user = false

	if (!user) return <Auth />
	return (
		<div className='container h-screen mx-auto max-w-7xl'>
			<div>Home</div>
		</div>
	)
}
