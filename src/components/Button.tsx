import { Dynamic } from 'solid-js/web'
import type { ParentComponent } from 'solid-js'
import * as css from './Button.css'

const Button: ParentComponent<{ href?: string }> = (props) => {
	const tag = () => {
		if (props.href) {
			return 'a'
		}
		return 'button'
	}

	return (
		<Dynamic
			component={tag()}
			class={css.root}
			href={props.href}
		>
			{props.children}
		</Dynamic>
	)
}

export default Button
