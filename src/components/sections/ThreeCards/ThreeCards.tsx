import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'
import styles from './ThreeCards.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.HelpCircle
}

interface CardItem {
  image: string
  title: string
  description: string
  buttonText: string
  buttonIcon?: string
  linkUrl?: string
}

interface ThreeCardsProps {
  sectionTitle?: string
  sectionSubtitle?: string
  cards: CardItem[]
}

function ThreeCards({ sectionTitle, sectionSubtitle, cards }: ThreeCardsProps) {
  if (!cards || cards.length === 0) return null

  return (
    <section className={styles.threeCardsSection}>
      <Reveal animation="fade-up" className={styles.threeCardsContainer}>
        {(sectionTitle || sectionSubtitle) && (
          <div className={styles.sectionHeader}>
            {sectionTitle && <h2 className={styles.sectionTitle}>{sectionTitle}</h2>}
            {sectionSubtitle && <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>}
          </div>
        )}
        <div className={styles.cardsGrid}>
          {cards.map((card, index) => {
          const Icon = card.buttonIcon ? resolveLucideIcon(card.buttonIcon) : null

          const content = (
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.textContent}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.description}>{card.description}</p>
                <div className={styles.buttonWrapper}>
                  <div className={styles.button}>
                    {Icon && <span className={styles.icon}><Icon size={18} strokeWidth={2.25} /></span>}
                    {card.buttonText}
                  </div>
                </div>
              </div>
            </div>
          )

          if (card.linkUrl) {
            return (
              <Link key={index} href={card.linkUrl} className={styles.link}>
                {content}
              </Link>
            )
          }
          return <div key={index} className={styles.link}>{content}</div>
        })}
        </div>
      </Reveal>
    </section>
  )
}

ThreeCards.displayName = 'ThreeCards'
export default ThreeCards
