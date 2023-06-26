import { motion } from 'framer-motion'

const svgVariants = {
  hidden: { rotate: -180 },
  visible: {
    rotate: 0,
    transition: { duration: 1 }
  }
}

const pathVariants = {
  hidden: {
    opacity: 1,
    pathLength: 0,
    transition: { delay: 1 }
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,

      ease: 'easeInOut',
      repeat: Infinity
    }
  }
}

export const LoadingAnimation = () => {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke='#000000'
      strokeWidth={1}
      strokeLinejoin='round'
      strokeLinecap='round'
      width='80px'
      overflow='visible'
      height='80px'
      fill='none'
      variants={svgVariants}
      initial='hidden'
      animate='visible'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <motion.path
        variants={pathVariants}
        d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5'
      />
    </motion.svg>
  )
}
