import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Fluid spring physics
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 })
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 })

  useEffect(() => {
    // Only activate for mouse/trackpad pointer fine
    const media = window.matchMedia('(pointer: fine)')
    setIsPointerFine(media.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches)
    }
    media.addEventListener('change', handleMediaChange)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('[data-cursor]') as HTMLElement | null
      const clickable = target.closest('button, a, input, textarea, [role="button"]')

      if (interactive) {
        setIsHovered(true)
        setCursorText(interactive.getAttribute('data-cursor') || '')
      } else if (clickable) {
        setIsHovered(true)
        setCursorText('')
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    if (media.matches) {
      document.body.classList.add('has-custom-cursor')
    }

    return () => {
      media.removeEventListener('change', handleMediaChange)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [mouseX, mouseY, isVisible])

  if (!isPointerFine || !isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Spring Ring with Hot Pink (#FF056D) Accent */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none transition-colors duration-200"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorText ? 88 : isHovered ? 48 : 28,
          height: cursorText ? 88 : isHovered ? 48 : 28,
          backgroundColor: cursorText ? '#FF056D' : isHovered ? 'rgba(255, 5, 109, 0.16)' : 'transparent',
          border: cursorText ? 'none' : isHovered ? '1.5px solid #FF056D' : '1px solid rgba(244, 239, 230, 0.35)',
          boxShadow: cursorText ? '0 0 24px rgba(255, 5, 109, 0.45)' : isHovered ? '0 0 14px rgba(255, 5, 109, 0.28)' : 'none'
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#090A0C] uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Dot in Hot Pink */}
      {!cursorText && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#FF056D] pointer-events-none"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </div>
  )
}
