import { createContext, useContext, useState } from 'react'
import th from '../i18n/th'
import en from '../i18n/en'

const translations = { th, en }

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('th')
  const t = translations[lang]
  const toggle = () => setLang(l => l === 'th' ? 'en' : 'th')
  return (
    <LanguageContext.Provider value={{ lang, t, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
