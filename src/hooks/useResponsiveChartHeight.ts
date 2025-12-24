import { useState, useEffect } from 'react'

export function useResponsiveChartHeight(
  desktopHeight = 400,
  tabletHeight = 350,
  mobileHeight = 280
): number {
  const [height, setHeight] = useState(desktopHeight)

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth
      if (width <= 500) {
        setHeight(mobileHeight)
      } else if (width <= 768) {
        setHeight(tabletHeight)
      } else {
        setHeight(desktopHeight)
      }
    }

    updateHeight()

    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateHeight, 100)
    }

    window.addEventListener('resize', debouncedUpdate)
    return () => {
      window.removeEventListener('resize', debouncedUpdate)
      clearTimeout(timeoutId)
    }
  }, [desktopHeight, tabletHeight, mobileHeight])

  return height
}
