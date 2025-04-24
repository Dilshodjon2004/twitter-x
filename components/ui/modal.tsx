import { ReactElement } from 'react'
import { Dialog, DialogContent } from './dialog'
import { X } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'

interface ModalProps {
	isOpen?: boolean
	onClose?: () => void
	body?: ReactElement
	footer?: ReactElement
	step?: number
	totalSteps?: number
}

export default function Modal({
	body,
	footer,
	isOpen,
	onClose,
	totalSteps,
	step,
}: ModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTitle className='hidden'></DialogTitle>
			<DialogContent className='bg-black p-2'>
				<div className='flex items-center gap-6'>
					<button
						className='p-1 border-0 text-white hover:opacity-70 transition w-fit'
						onClick={onClose}
					>
						<X size={28} />
					</button>
					{step && totalSteps && (
						<div className='text-xl font-bold'>
							Step {step} of {totalSteps}
						</div>
					)}
				</div>
				<div className='mt-4'>{body}</div>
				{footer && <div>{footer}</div>}
			</DialogContent>
		</Dialog>
	)
}
