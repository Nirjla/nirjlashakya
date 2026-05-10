/**
 * Framer Motion animation configurations
 * Reusable animation variants for consistent premium feel
 */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const slideInVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export const slideOutVariants = {
  initial: { x: 0, opacity: 1 },
  exit: {
    x: 20,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

export const scaleInVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
}

export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const glowVariants = {
  animate: {
    textShadow: [
      '0 0 10px currentColor',
      '0 0 20px currentColor',
      '0 0 10px currentColor',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const hoverLiftVariants = {
  initial: { y: 0 },
  whileHover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  whileTap: {
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
}

export const dockIconVariants = {
  initial: { scale: 1, y: 0 },
  whileHover: {
    scale: 1.2,
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  whileTap: {
    scale: 0.95,
  },
}

export const tabSwitchVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
}

export const commandExecuteVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

export const loadingSkeletonVariants = {
  loading: {
    background: [
      'linear-gradient(90deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 50%, hsl(var(--secondary)) 100%)',
      'linear-gradient(90deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 100%, hsl(var(--secondary)) 100%)',
    ],
    backgroundSize: ['200% 100%', '200% 100%'],
    backgroundPosition: ['0% 0%', '100% 0%'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * Spring animation for smooth, natural motion
 */
export const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
}

/**
 * Easing presets
 */
export const easings = {
  smooth: [0.4, 0, 0.2, 1],
  snappy: [0.34, 1.56, 0.64, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
}
