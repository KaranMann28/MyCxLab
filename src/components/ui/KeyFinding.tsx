import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { viewportSettings } from '@/constants/animations'
import styles from './KeyFinding.module.css'

interface KeyFindingProps {
  content: string
}

export function KeyFinding({ content }: KeyFindingProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      className={styles.keyFinding}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.5 }}
    >
      <strong>{t('ui.keyFinding')}:</strong> {content}
    </motion.div>
  )
}
