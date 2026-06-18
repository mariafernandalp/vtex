import React, { useEffect, useRef, useState } from 'react'
import styles from './Reveal.module.scss'

interface RevealProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up'
  threshold?: number
  delay?: number
}

export default function Reveal({ children, className = '', animation = 'fade-up', threshold = 0.1, delay = 0 }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Aciona um pouco antes de aparecer 100%
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {}

  return (
    <div
      ref={ref}
      style={delayStyle}
      className={`${styles.revealWrapper} ${styles[animation]} ${isVisible ? styles.visible : ''} ${className}`}
    >
      {children}
    </div>
  )
}
