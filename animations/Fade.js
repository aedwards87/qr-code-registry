import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function Fade({ children, isActive }) {
  return (
    <AnimatePresence>
      {isActive &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1 } }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Fade