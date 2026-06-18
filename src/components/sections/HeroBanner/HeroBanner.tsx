import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'
import styles from './HeroBanner.module.scss'

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.HelpCircle
}

interface HeroBannerProps {
  image: string
  title: string
  description: string
  buttonText: string
  buttonIcon?: string
  linkUrl?: string
}

function HeroBanner(props: HeroBannerProps) {
  const { image, title, description, buttonText, buttonIcon, linkUrl } = props
  if (!image) return null

  const Icon = buttonIcon ? resolveLucideIcon(buttonIcon) : null

  const content = (
    <>
      <Image
        src={image}
        alt={title || 'Banner'}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.textContent}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {description && <p className={styles.description}>{description}</p>}
        {buttonText && (
          <div className={styles.buttonWrapper}>
            <div className={styles.button}>
              {Icon && <span className={styles.icon}><Icon size={20} strokeWidth={2} /></span>}
              {buttonText}
            </div>
          </div>
        )}
      </div>
    </>
  )

  return (
    <section className={styles.heroBannerSection}>
      {linkUrl ? (
        <Link href={linkUrl} className={styles.container}>
          {content}
        </Link>
      ) : (
        <div className={styles.container}>{content}</div>
      )}
    </section>
  )
}

HeroBanner.displayName = 'HeroBanner'
export default HeroBanner
