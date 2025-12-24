import type { Variants, Transition } from 'framer-motion'

// Shared transitions
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}

export const easeOutTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
}

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    }
  },
}

// Stagger container variants
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Fade in up variants (for children in stagger)
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
}

// Scale in variants
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    }
  },
}

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    }
  },
}

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    }
  },
}

// Chart container variants (for drawing effect)
export const chartContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    }
  },
}

// Hover variants for cards
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    }
  },
}

// Border animation for insight boxes
export const borderSlideVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    }
  },
}

// Number counter animation config
export const counterConfig = {
  duration: 2,
  ease: 'easeOut' as const,
}

// Viewport trigger settings
export const viewportSettings = {
  once: true,
  amount: 0.3,
}
