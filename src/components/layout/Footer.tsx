import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { colors } from '@/constants/colors'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useTranslation()

  return (
    <motion.footer
      className={styles.footer}
      style={{ background: colors.text }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className={styles.mainText}>{t('footer.mainText')}</p>
      <p className={styles.contactText}>
        {t('footer.contactPrompt')}{' '}
        <a href="mailto:cx-lab@gorgias.com" className={styles.link}>
          {t('footer.contactLink')}
        </a>
      </p>
    </motion.footer>
  )
}
