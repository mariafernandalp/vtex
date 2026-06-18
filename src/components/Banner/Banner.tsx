import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from '@faststore/ui'

// Ensure standard Carousel styles are loaded
import '@faststore/ui/src/components/molecules/Carousel/styles.scss'

interface BannerItem {
  title: string
  imageUrl: string
  imageUrlMobile?: string
  linkUrl?: string
}

interface CarouselBannerProps {
  banners: BannerItem[]
}

function CarouselBanner({ banners }: CarouselBannerProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!banners || banners.length < 2) return

    const intervalId = window.setInterval(() => {
      const nextControl = carouselRef.current?.querySelectorAll<HTMLElement>(
        '[data-fs-carousel-control]'
      )

      const nextButton = nextControl?.[1]
      if (nextButton) nextButton.click()
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [banners])

  if (!banners || banners.length === 0) return null

  return (
    <section
      className="section-carousel-banner"
      aria-label="Main Banner Carousel"
      style={{
        width: '100%',
        display: 'block'
      }}
    >
      <div
        ref={carouselRef}
        style={{
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <Carousel id="hero-carousel" itemsPerPage={1} variant="slide" infiniteMode controls="complete">
            {banners.map((banner, index) => {
              const mobileImg = banner.imageUrlMobile || banner.imageUrl
              const slide = (
                <div className="carousel-slide-container">
                  <Image
                    className="carousel-image-desktop"
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                  />
                  <Image
                    className="carousel-image-mobile"
                    src={mobileImg}
                    alt={banner.title}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )

              return banner.linkUrl ? (
                <Link
                  key={index}
                  href={banner.linkUrl}
                  title={banner.title}
                  style={{ display: 'block', width: '100%' }}
                >
                  {slide}
                </Link>
              ) : (
                <div key={index} style={{ width: '100%' }}>{slide}</div>
              )
            })}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

CarouselBanner.displayName = 'CarouselBanner'
export default CarouselBanner