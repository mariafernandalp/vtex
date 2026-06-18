import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'
import styles from './FourCards.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.ArrowRight
}

interface CardItem {
  image: string
  title: string
  buttonIcon: string
  linkUrl?: string
}

interface FourCardsProps {
  sectionTitle?: string
  sectionSubtitle?: string
  cards: CardItem[]
}

function FourCards({ sectionTitle, sectionSubtitle, cards }: FourCardsProps) {
  if (!cards || cards.length !== 4) return null

  return (
    <section className={styles.fourCardsSection}>
      <Reveal animation="fade-up" className={styles.containerWrapper}>
        {(sectionTitle || sectionSubtitle) && (
          <div className={styles.sectionHeader}>
            {sectionTitle && <h2 className={styles.sectionTitle}>{sectionTitle}</h2>}
            {sectionSubtitle && <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>}
          </div>
        )}
        <div className={styles.gridContainer}>
          {cards.map((card, index) => {
            const Icon = card.buttonIcon ? resolveLucideIcon(card.buttonIcon) : null

            const content = (
              <div className={styles.card}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
                <div className={styles.overlay} />
                <div className={styles.textContent}>
                  <h3 className={styles.title}>{card.title}</h3>
                  {Icon && (
                    <div className={styles.circularButton}>
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              </div>
            )

            if (card.linkUrl) {
              return (
                <Link key={index} href={card.linkUrl} className={styles.cardLink}>
                  {content}
                </Link>
              )
            }

            return (
              <div key={index} className={styles.cardLink}>
                {content}
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

FourCards.displayName = 'FourCards'
export default FourCards
