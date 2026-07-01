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
  layout?: string
  photos: PhotoItem[]
}

function PhotoGrid({ sectionTitle, sectionSubtitle, layout = 'vertical', photos }: PhotoGridProps) {
  if (!photos || photos.length < 2) return null

  const isHorizontal = layout === 'horizontal'
  const maxPhotos = isHorizontal ? 2 : 4
  const count = Math.min(photos.length, maxPhotos)
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
        <div className={`${styles.grid} ${isHorizontal ? styles.gridHorizontal : gridClass}`}>
          {photos.slice(0, maxPhotos).map((photo, index) => {
            const content = (
              <div className={`${styles.card} ${isHorizontal ? styles.cardHorizontal : ''}`}>
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
