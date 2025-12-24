import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { viewportSettings } from '@/constants/animations'
import styles from './MethodologyBox.module.css'

interface MethodologyBoxProps {
  content: string
}

export function MethodologyBox({ content }: MethodologyBoxProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      className={styles.methodology}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.5 }}
    >
      <h5 className={styles.title}>{t('ui.methodology')}</h5>
      <p>{content}</p>
    </motion.div>
  )
}
