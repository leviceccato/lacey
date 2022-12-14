import { Show, createEffect } from 'solid-js'
import type { ParentComponent, Signal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { usePortal } from '@/components/ProviderPortal'
import * as css from './Modal.css'
import { useI18n } from '@/components/ProviderI18n'

import ProviderFocusTrap from '@/components/ProviderFocusTrap'
import Text from '@/components/Text'
import IconButton from '@/components/IconButton'

export type ModalProps = {
	isShown: Signal<boolean>
	onShow?: () => void
	onHide?: () => void
}

const Modal: ParentComponent<ModalProps> = (props) => {
	const [isShown, setIsShown] = props.isShown

	const { mounts } = usePortal()
	const [t] = useI18n()

	let containerRef: HTMLDivElement | undefined

	const modal = () => mounts().get('modal')

	createEffect(() => {
		if (isShown()) {
			window.addEventListener('keydown', handleEscapeToClose)
			return props.onShow?.()
		}
		window.removeEventListener('keydown', handleEscapeToClose)
		props.onHide?.()
	})

	function handleRootClick({ target }: MouseEvent) {
		// Ignore clicks inside main modal content
		if (target instanceof Node && containerRef?.contains(target)) {
			return
		}

		setIsShown(false)
	}

	function handleEscapeToClose({ key }: KeyboardEvent) {
		if (key === 'Escape') {
			setIsShown(false)
		}
	}

	return (
		<Show when={isShown() && modal()}>
			<Portal mount={modal()}>
				<ProviderFocusTrap when={isShown()}>
					{([_, unreachableFocusableProps]) => (
						<div
							onClick={handleRootClick}
							class={css.root}
						>
							<div
								ref={containerRef}
								class={css.container}
							>
								<div
									{...unreachableFocusableProps}
									class={`${css.header} ${unreachableFocusableProps.class}`}
								>
									<Text variant="bodyS">Modal</Text>
									<IconButton
										onClick={() => setIsShown(false)}
										name="close"
										tooltip={t().close}
									/>
								</div>
								<div class={css.main}>{props.children}</div>
							</div>
						</div>
					)}
				</ProviderFocusTrap>
			</Portal>
		</Show>
	)
}

export default Modal
