import { createUniqueId } from 'solid-js'
import { ErrorBoundary } from 'solid-js/web'
import type { ParentComponent } from 'solid-js'
import * as css from './ErrorDisplay.css'
import { useIcons } from '@/components/ProviderIcons'

import Text from '@/components/Text'

const ErrorDisplay: ParentComponent = (props) => {
	const [Icon] = useIcons()

	const errorId = createUniqueId()

	return (
		<ErrorBoundary
			fallback={(error) => (
				<div class={css.root}>
					<Icon
						class={css.icon}
						name="warning"
					/>
					<Text variant="bodyS">An error has occured in script execution</Text>
					<Text variant="bodyXs">
						See console for error output (ID: {errorId})
					</Text>
					{() => {
						console.log(`Error ID: ${errorId}`)
						console.error(error)
						return null
					}}
				</div>
			)}
		>
			{props.children}
		</ErrorBoundary>
	)
}

export default ErrorDisplay
