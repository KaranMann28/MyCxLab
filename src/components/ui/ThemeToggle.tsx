import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import styles from './ThemeToggle.module.css'

const sunPath =
  'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
const moonPath =
  'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <motion.button
      className={styles.button}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
        initial={false}
        animate={{
          rotate: isDark ? 360 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <motion.path
          initial={false}
          animate={{
            d: isDark ? moonPath : sunPath,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.svg>
    </motion.button>
  )
}
