import type { Metadata } from 'next'
import './globals.css'
import { Provider } from './provider'

export const metadata: Metadata = {
	title: 'Twitter X',
	description: 'A Twitter clone built with Next.js and MongoDB.',
	icons: { icon: '/images/x.svg' },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={` antialiased`}>
				<Provider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</Provider>
			</body>
		</html>
	)
}
