import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './SplitScreen.module.scss'

interface SplitCardProps {
  image: string
  title: string
  description: string
  buttonText: string
  linkUrl?: string
}

interface SplitScreenProps {
  leftCard: SplitCardProps
  rightCard: SplitCardProps
}

function SplitCard({ card }: { card: SplitCardProps }) {
  const content = (
    <>
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
        <h2 className={styles.title}>{card.title}</h2>
        <p className={styles.description}>{card.description}</p>
        <span className={styles.linkText}>{card.buttonText}</span>
      </div>
    </>
  )

  if (card.linkUrl) {
    return (
      <Link href={card.linkUrl} className={styles.card}>
        {content}
      </Link>
    )
  }

  return <div className={styles.card}>{content}</div>
}

function SplitScreen({ leftCard, rightCard }: SplitScreenProps) {
  if (!leftCard || !rightCard) return null

  return (
    <section className={styles.splitScreenSection}>
      <SplitCard card={leftCard} />
      <SplitCard card={rightCard} />
    </section>
  )
}

SplitScreen.displayName = 'SplitScreen'
export default SplitScreen
