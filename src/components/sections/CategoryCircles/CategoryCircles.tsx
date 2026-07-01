import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './CategoryCircles.module.scss'
import Reveal from '../../ui/Reveal/Reveal'

interface CategoryItem {
  image: string
  title: string
  linkUrl?: string
}

interface CategoryCirclesProps {
  layout?: string
  sectionTitle?: string
  sectionSubtitle?: string
  categories: CategoryItem[]
}

function CategoryCircles({ layout = 'circles', sectionTitle, sectionSubtitle, categories }: CategoryCirclesProps) {
  if (!categories || categories.length < 6) return null

  const isCards = layout === 'cards'

  return (
    <section className={styles.section}>
      <Reveal animation="fade-up" className={styles.container}>
        {(sectionTitle || sectionSubtitle) && (
          <div className={styles.sectionHeader}>
            {sectionTitle && <h2 className={styles.sectionTitle}>{sectionTitle}</h2>}
            {sectionSubtitle && <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>}
          </div>
        )}
        <div className={`${styles.grid} ${isCards ? styles.gridCards : styles.gridCircles}`}>
          {categories.slice(0, 6).map((category, index) => {
            const content = (
              <div className={isCards ? styles.card : styles.circle}>
                <div className={isCards ? styles.imageWrapperCards : styles.imageWrapperCircles}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="50vw"
                    className={styles.image}
                    style={{ objectFit: isCards ? 'cover' : 'contain' }}
                  />
                </div>
                {isCards && <div className={styles.overlay} />}
                <span className={`${styles.label} ${isCards ? styles.labelCards : styles.labelCircles}`}>{category.title}</span>
              </div>
            )

            if (category.linkUrl) {
              return (
                <Link key={index} href={category.linkUrl} className={`${styles.link} ${isCards ? styles.linkCards : ''}`}>
                  {content}
                </Link>
              )
            }

            return <div key={index} className={`${styles.link} ${isCards ? styles.linkCards : ''}`}>{content}</div>
          })}
        </div>
      </Reveal>
    </section>
  )
}

CategoryCircles.displayName = 'CategoryCircles'
export default CategoryCircles
