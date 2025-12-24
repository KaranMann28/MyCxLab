import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatedPage } from '@/components/animations'
import { ScrollToTop } from '@/components/ui'
import { useThemeStore } from '@/store/themeStore'
import styles from './PageLayout.module.css'

export function PageLayout() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme)

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  return (
    <div className={styles.layout}>
      <AnimatedPage>
        <Outlet />
      </AnimatedPage>
      <ScrollToTop />
    </div>
  )
}
