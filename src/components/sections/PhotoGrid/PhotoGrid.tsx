import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './PhotoGrid.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

interface PhotoItem {
  image: string
  title?: string
  linkUrl?: string
}

interface PhotoGridProps {
  sectionTitle?: string
  sectionSubtitle?: string
  photos: PhotoItem[]
}

function PhotoGrid({ sectionTitle, sectionSubtitle, photos }: PhotoGridProps) {
  if (!photos || photos.length < 2) return null

  const count = Math.min(photos.length, 4)
  const gridClass = count === 3 ? styles.grid3 : ''

  return (
    <section className={styles.section}>
      <Reveal animation="fade-up" className={styles.container}>
        {(sectionTitle || sectionSubtitle) && (
          <div className={styles.sectionHeader}>
            {sectionTitle && <h2 className={styles.sectionTitle}>{sectionTitle}</h2>}
            {sectionSubtitle && <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>}
          </div>
        )}
        <div className={`${styles.grid} ${gridClass}`}>
          {photos.slice(0, 4).map((photo, index) => {
            const content = (
              <div className={styles.card}>
                <Image
                  src={photo.image}
                  alt={photo.title ?? ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                  style={{ objectFit: 'cover' }}
                />
                {photo.title && (
                  <div className={styles.overlay}>
                    <h3 className={styles.title}>{photo.title}</h3>
                  </div>
                )}
              </div>
            )

            if (photo.linkUrl) {
              return (
                <Link key={index} href={photo.linkUrl} className={styles.link}>
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

PhotoGrid.displayName = 'PhotoGrid'
export default PhotoGrid
