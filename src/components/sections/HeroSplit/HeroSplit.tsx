import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'
import styles from './HeroSplit.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.HelpCircle
}

function renderHighlightedTitle(title: string): React.ReactNode {
  const parts = title.split(/(\|\|.*?\|\|)/g)
  return parts.map((part, i) => {
    if (part.startsWith('||') && part.endsWith('||')) {
      return (
        <span key={i} className={styles.highlight}>
          {part.slice(2, -2)}
        </span>
      )
    }
    return part
  })
}

interface HeroSplitProps {
  image?: string
  imageAlt?: string
  geolocationIcon?: string
  geolocationText?: string
  title?: string
  description?: string
  authorityLabel1?: string
  authorityDescription1?: string
  authorityLabel2?: string
  authorityDescription2?: string
  buttonText?: string
  buttonIcon?: string
  linkUrl?: string
}

function HeroSplit({
  image,
  imageAlt,
  geolocationIcon,
  geolocationText,
  title,
  description,
  authorityLabel1,
  authorityDescription1,
  authorityLabel2,
  authorityDescription2,
  buttonText,
  buttonIcon,
  linkUrl,
}: HeroSplitProps) {
  if (!image) return null

  const GeoIcon = geolocationIcon ? resolveLucideIcon(geolocationIcon) : null
  const BtnIcon = buttonIcon ? resolveLucideIcon(buttonIcon) : null

  const hasAuthority =
    (authorityLabel1 || authorityDescription1) &&
    (authorityLabel2 || authorityDescription2)

  const button = buttonText && (
    <div className={styles.buttonWrapper}>
      <div className={styles.button}>
        {buttonText}
        {BtnIcon && (
          <span className={styles.buttonIcon}>
            <BtnIcon size={18} strokeWidth={2.5} />
          </span>
        )}
      </div>
    </div>
  )

  const content = (
    <section className={styles.heroSplitSection}>
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <Image
            src={image}
            alt={imageAlt || title || ''}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            className={styles.image}
          />
          {(GeoIcon || geolocationText) && (
            <div className={styles.geoBox}>
              {GeoIcon && (
                <span className={styles.geoIcon}>
                  <GeoIcon size={16} strokeWidth={2} />
                </span>
              )}
              {geolocationText && (
                <span className={styles.geoText}>{geolocationText}</span>
              )}
            </div>
          )}
        </div>
        <div className={styles.contentColumn}>
          <Reveal animation="fade-up" className={styles.contentInner}>
            {title && (
              <h2 className={styles.title}>
                {renderHighlightedTitle(title)}
              </h2>
            )}
            {description && (
              <p className={styles.description}>{description}</p>
            )}
            {hasAuthority && (
              <div className={styles.authorityRow}>
                <div className={styles.authorityItem}>
                  {authorityLabel1 && (
                    <span className={styles.authorityLabel}>
                      {authorityLabel1}
                    </span>
                  )}
                  {authorityDescription1 && (
                    <span className={styles.authorityDesc}>
                      {authorityDescription1}
                    </span>
                  )}
                </div>
                <div className={styles.authorityDivider} />
                <div className={styles.authorityItem}>
                  {authorityLabel2 && (
                    <span className={styles.authorityLabel}>
                      {authorityLabel2}
                    </span>
                  )}
                  {authorityDescription2 && (
                    <span className={styles.authorityDesc}>
                      {authorityDescription2}
                    </span>
                  )}
                </div>
              </div>
            )}
            {linkUrl ? (
              <Link href={linkUrl} className={styles.linkWrapper}>
                {button}
              </Link>
            ) : (
              button
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )

  return content
}

HeroSplit.displayName = 'HeroSplit'
export default HeroSplit
