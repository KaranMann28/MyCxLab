import { motion } from 'framer-motion'
import { useLanguageStore } from '@/store/languageStore'
import styles from './LanguageToggle.module.css'

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'fr' as const, label: 'FR' },
]

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore()

  const activeIndex = languages.findIndex((l) => l.code === language)

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.slider}
        initial={false}
        animate={{
          x: activeIndex * 40,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          className={`${styles.button} ${language === lang.code ? styles.active : ''}`}
          onClick={() => setLanguage(lang.code)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${lang.code === 'en' ? 'English' : 'French'}`}
          aria-pressed={language === lang.code}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  )
}
