import { createTranslation } from '@/scripts/i18n'

export default createTranslation({
	language: {
		setTo: (language: string) => `Establecer idioma en ${language}`,
		all: {
			_default: {
				_: 'Inglés',
				untranslated: 'English',
			},
			spanish: {
				_: 'Español',
				untranslated: 'Español',
			},
		},
	},
	light: 'Ligero',
	dark: 'Oscuro',
	system: 'Sistema',
	custom: 'Personalizado',
	untitled: 'Intitulado',
	preferences: 'Preferencias',
	about: 'Sobre',
	close: 'Cerrar',
	document: {
		new: 'Nuevo documento',
	},
	preview: 'Previsualizar',
})
