import { useTranslation } from 'react-i18next'
import { IntroSection } from './IntroSection'
import styles from './ClosingSection.module.css'

export function ClosingSection() {
  const { t } = useTranslation()

  return (
    <IntroSection title={t('closing.title')}>
      <p>{t('closing.paragraph1')}</p>
      <p className={styles.paragraph}>{t('closing.paragraph2')}</p>
      <p className={styles.paragraph}>{t('closing.paragraph3')}</p>
    </IntroSection>
  )
}
