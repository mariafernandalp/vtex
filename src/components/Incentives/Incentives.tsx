'use client'

import { useEffect, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import * as lucideIcons from 'lucide-react'

interface IncentiveItem {
  title: string
  iconName: string
}

interface IncentivesProps {
  incentivesList: IncentiveItem[]
}

function resolveLucideIcon(iconName: string): LucideIcon {
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = lucideIcons as unknown as Record<string, LucideIcon>
  return registry[normalized] || registry[trimmed] || lucideIcons.HelpCircle
}

function Incentives({ incentivesList }: IncentivesProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const wrapper = el.querySelector('.incentives-content-wrapper') as HTMLElement | null
    if (!wrapper) return
    const halfWidth = wrapper.scrollWidth / 2
    const duration = Math.max(10, halfWidth / 45)
    el.style.setProperty('--scroll-duration', `${duration}s`)
  }, [incentivesList])

  if (!incentivesList || incentivesList.length === 0) return null

  const duplicated = [...incentivesList, ...incentivesList]

  return (
    <section className="section section-incentives" data-fs-incentives>
      <div className="incentives-track" ref={trackRef}>
        <div className="incentives-content-wrapper">
          {duplicated.map((item, index) => {
            const Icon = resolveLucideIcon(item.iconName)
            return (
              <div key={index} className="incentives-item">
                <span className="incentives-icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={2.25} />
                </span>
                <span className="incentives-title">{item.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

Incentives.displayName = 'Incentives'
export default Incentives
