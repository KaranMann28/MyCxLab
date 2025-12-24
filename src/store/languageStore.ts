import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '@/i18n'

type Language = 'en' | 'fr'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: (i18n.language?.substring(0, 2) as Language) || 'en',
      setLanguage: (language: Language) => {
        i18n.changeLanguage(language)
        set({ language })
      },
    }),
    {
      name: 'cx-lab-language',
    }
  )
)
