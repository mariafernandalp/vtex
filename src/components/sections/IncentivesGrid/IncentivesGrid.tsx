import React from 'react'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'
import styles from './IncentivesGrid.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.ArrowRight
}

interface IncentiveItem {
  icon: string
  title: string
  subtitle: string
}

interface IncentivesGridProps {
  sectionTitle?: string
  sectionSubtitle?: string
  incentives: IncentiveItem[]
}

function IncentivesGrid({ sectionTitle, sectionSubtitle, incentives }: IncentivesGridProps) {
  if (!incentives || incentives.length < 4) return null

  return (
    <section className={styles.section}>
      <Reveal animation="fade-up" className={styles.container}>
        {(sectionTitle || sectionSubtitle) && (
          <div className={styles.sectionHeader}>
            {sectionTitle && <h2 className={styles.sectionTitle}>{sectionTitle}</h2>}
            {sectionSubtitle && <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>}
          </div>
        )}
        <div className={styles.grid}>
          {incentives.map((item, index) => {
            const Icon = resolveLucideIcon(item.icon)

            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.subtitle}>{item.subtitle}</p>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

IncentivesGrid.displayName = 'IncentivesGrid'
export default IncentivesGrid
