import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    hi: () => import('./dictionaries/hi.json').then((module) => module.default),
    ar: () => import('./dictionaries/ar.json').then((module) => module.default),
    ur: () => import('./dictionaries/ur.json').then((module) => module.default),
    ch: () => import('./dictionaries/ch.json').then((module) => module.default)
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en()
