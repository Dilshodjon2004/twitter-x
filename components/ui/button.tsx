import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ButtonProps {
	label: ReactNode | string
	secondary?: boolean
	fullWidth?: boolean
	large?: boolean
	disabled?: boolean
	outline?: boolean
	type?: 'button' | 'submit'
	onClick?: () => void
	classNames?: string
}

export default function Button({
	label,
	secondary,
	fullWidth,
	large,
	disabled,
	outline,
	type,
	onClick,
	classNames,
}: ButtonProps) {
	return (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			className={cn(
				'rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed',
				fullWidth ? 'w-full' : 'w-fit',
				secondary ? 'bg-white text-black' : 'bg-sky-500 text-white',
				large ? 'text-xl px-5 py-3' : 'text-md px-4 py-3',
				outline
					? 'bg-transparent border-slate-600 text-sky-500 hover:bg-slate-800/40'
					: '',
				classNames
			)}
		>
			{label}
		</button>
	)
}
