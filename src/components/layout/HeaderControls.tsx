import { ThemeToggle, LanguageToggle } from '@/components/ui'
import styles from './HeaderControls.module.css'

export function HeaderControls() {
  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.divider} />
      <LanguageToggle />
    </div>
  )
}
