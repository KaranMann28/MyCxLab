import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gradients } from '@/constants/colors'
import { HeaderControls } from './HeaderControls'
import styles from './Header.module.css'

export function Header() {
  const { t } = useTranslation()

  return (
    <motion.header
      className={styles.header}
      style={{ background: gradients.header }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.controls}>
        <HeaderControls />
      </div>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('header.title')}
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {t('header.subtitle')}
      </motion.p>
    </motion.header>
  )
}
