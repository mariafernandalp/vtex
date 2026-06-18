import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'
import styles from './HighlightCards.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.ArrowRight
}

interface MainCard {
  image: string
  title: string
  description: string
  buttonIcon: string
  linkUrl?: string
}

interface SideCard {
  image: string
  linkUrl?: string
}

interface HighlightCardsProps {
  sectionTitle?: string
  sectionSubtitle?: string
  mainCard: MainCard
  sideCards: SideCard[]
}

export default function HighlightCards({ sectionTitle, sectionSubtitle, mainCard, sideCards }: HighlightCardsProps) {
  if (!mainCard || !sideCards || sideCards.length < 2) return null

  const Icon = resolveLucideIcon(mainCard.buttonIcon)

  const MainCardContent = (
    <div className={styles.mainCard}>
      <Image
        src={mainCard.image}
        alt={mainCard.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
        className={styles.image}
      />
      <div className={styles.overlayCard}>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>{mainCard.title}</h3>
          <p className={styles.description}>{mainCard.description}</p>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.circularButton}>
            <Icon size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className={styles.section}>
      <Reveal animation="fade-up" className={styles.containerWrapper}>
        {(sectionTitle || sectionSubtitle) && (
          <div className={styles.header}>
            {sectionTitle && <h2 className={styles.sectionTitle}>{sectionTitle}</h2>}
            {sectionSubtitle && <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>}
          </div>
        )}
        <div className={styles.gridContainer}>
          {/* Main Card */}
        {mainCard.linkUrl ? (
          <Link href={mainCard.linkUrl} className={styles.mainCardLink}>
            {MainCardContent}
          </Link>
        ) : (
          <div className={styles.mainCardLink}>{MainCardContent}</div>
        )}

        {/* Side Cards */}
        {sideCards.slice(0, 2).map((card, index) => {
          const SideCardContent = (
            <div className={styles.sideCard}>
              <Image
                src={card.image}
                alt={`Side card ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
                className={styles.image}
              />
            </div>
          )

          return card.linkUrl ? (
            <Link key={index} href={card.linkUrl} className={styles.sideCardLink}>
              {SideCardContent}
            </Link>
          ) : (
            <div key={index} className={styles.sideCardLink}>
              {SideCardContent}
            </div>
          )
        })}
        </div>
      </Reveal>
    </section>
  )
}

HighlightCards.displayName = 'HighlightCards'
