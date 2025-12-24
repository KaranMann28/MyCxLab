import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseAnimationOnScrollOptions {
  once?: boolean
  amount?: number
}

export function useAnimationOnScroll({
  once = true,
  amount = 0.3,
}: UseAnimationOnScrollOptions = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount,
  })

  return { ref, isInView }
}
