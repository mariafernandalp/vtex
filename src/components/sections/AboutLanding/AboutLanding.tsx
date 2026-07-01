import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'
import styles from './AboutLanding.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.ArrowRight
}

interface StatItem {
  icon?: string
  number: string
  suffix?: string
  label: string
}

interface ValueItem {
  icon?: string
  title: string
  description?: string
}

interface GalleryItem {
  image: string
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall'
}

interface AboutLandingProps {
  heroImage?: string
  heroTitle?: string
  heroSubtitle?: string
  aboutImage?: string
  aboutTitle?: string
  aboutText?: string
  aboutImagePosition?: 'left' | 'right'
  statsTitle?: string
  stats?: StatItem[]
  valuesTitle?: string
  values?: ValueItem[]
  galleryTitle?: string
  gallery?: GalleryItem[]
  ctaBackground?: string
  ctaTitle?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

function getSizeClass(size?: string): string {
  switch (size) {
    case 'large': return styles.galleryLarge
    case 'wide': return styles.galleryWide
    case 'tall': return styles.galleryTall
    case 'small': return styles.gallerySmall
    default: return styles.galleryMedium
  }
}

function AboutLanding({
  heroImage,
  heroTitle,
  heroSubtitle,
  aboutImage,
  aboutTitle,
  aboutText,
  aboutImagePosition = 'right',
  statsTitle,
  stats,
  valuesTitle,
  values,
  galleryTitle,
  gallery,
  ctaBackground,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonLink,
}: AboutLandingProps) {
  const hasHero = heroImage || heroTitle || heroSubtitle
  const hasAbout = (aboutImage || aboutTitle || aboutText)
  const hasStats = stats && stats.length > 0
  const hasValues = values && values.length > 0
  const hasGallery = gallery && gallery.length > 0
  const hasCta = (ctaBackground || ctaTitle || ctaText || ctaButtonText)

  return (
    <section className={styles.section}>
      {hasHero && (
        <Reveal animation="fade-in" className={styles.hero}>
          {heroImage && (
            <Image
              src={heroImage}
              alt={heroTitle || ''}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              className={styles.heroImage}
            />
          )}
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            {heroTitle && <h1 className={styles.heroTitle}>{heroTitle}</h1>}
            {heroSubtitle && <p className={styles.heroSubtitle}>{heroSubtitle}</p>}
          </div>
        </Reveal>
      )}

      {hasAbout && (
        <div className={styles.aboutSection}>
          <div className={styles.container}>
            <Reveal animation="fade-up" className={`${styles.aboutGrid} ${aboutImagePosition === 'left' ? styles.aboutGridReverse : ''}`}>
              {aboutImage && (
                <div className={styles.aboutImageWrapper}>
                  <Image
                    src={aboutImage}
                    alt={aboutTitle || ''}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className={styles.aboutImage}
                  />
                </div>
              )}
              <div className={styles.aboutContent}>
                {aboutTitle && <h2 className={styles.sectionTitle}>{aboutTitle}</h2>}
                {aboutText && (
                  <div className={styles.aboutText}>
                    {aboutText.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {hasStats && (
        <div className={styles.statsSection}>
          <div className={styles.container}>
            <Reveal animation="fade-up" className={styles.statsInner}>
              {statsTitle && <h2 className={styles.sectionTitleCentered}>{statsTitle}</h2>}
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => {
                  const Icon = stat.icon ? resolveLucideIcon(stat.icon) : null
                  return (
                    <div key={index} className={styles.statCard}>
                      {Icon && (
                        <div className={styles.statIcon}>
                          <Icon size={40} strokeWidth={1.5} />
                        </div>
                      )}
                      <div className={styles.statNumber}>
                        {stat.number}
                        {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
                      </div>
                      <p className={styles.statLabel}>{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {hasValues && (
        <div className={styles.valuesSection}>
          <div className={styles.container}>
            <Reveal animation="fade-up" className={styles.valuesInner}>
              {valuesTitle && <h2 className={styles.sectionTitleCentered}>{valuesTitle}</h2>}
              <div className={styles.valuesGrid}>
                {values.map((value, index) => {
                  const Icon = value.icon ? resolveLucideIcon(value.icon) : null
                  return (
                    <div key={index} className={styles.valueCard}>
                      {Icon && (
                        <div className={styles.valueIcon}>
                          <Icon size={48} strokeWidth={1.5} />
                        </div>
                      )}
                      <h3 className={styles.valueTitle}>{value.title}</h3>
                      {value.description && (
                        <p className={styles.valueDescription}>{value.description}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {hasGallery && (
        <div className={styles.gallerySection}>
          <div className={styles.container}>
            <Reveal animation="fade-up" className={styles.galleryInner}>
              {galleryTitle && <h2 className={styles.sectionTitleCentered}>{galleryTitle}</h2>}
              <div className={styles.galleryGrid}>
                {gallery.map((item, index) => (
                  <div key={index} className={`${styles.galleryItem} ${getSizeClass(item.size)}`}>
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {hasCta && (
        <div className={styles.ctaSection}>
          {ctaBackground && (
            <Image
              src={ctaBackground}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              className={styles.ctaImage}
            />
          )}
          <div className={styles.ctaOverlay} />
          <Reveal animation="fade-up" className={styles.ctaContent}>
            {ctaTitle && <h2 className={styles.ctaTitle}>{ctaTitle}</h2>}
            {ctaText && <p className={styles.ctaText}>{ctaText}</p>}
            {ctaButtonText && ctaButtonLink && (
              <Link href={ctaButtonLink} className={styles.ctaButton}>
                {ctaButtonText}
              </Link>
            )}
          </Reveal>
        </div>
      )}
    </section>
  )
}

AboutLanding.displayName = 'AboutLanding'
export default AboutLanding
