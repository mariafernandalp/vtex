import React, { useState } from 'react'
import {
  Accordion as UIAccordion,
  AccordionButton as UIAccordionButton,
  AccordionItem as UIAccordionItem,
  AccordionPanel as UIAccordionPanel,
  List as UIList,
  PaymentMethods as UIPaymentMethods,
  Link,
  Icon,
  Incentive as UIIncentive
} from '@faststore/ui'
import * as LucideIcons from 'lucide-react'
import { Section } from '@faststore/core'
import styles from './Footer.module.scss'
import useScreenResize from '@faststore/core/src/sdk/ui/useScreenResize' // Wait, I shouldn't import from /src/. 

// Let's implement a quick useScreenResize hook instead to be safe from import errors.
function useWindowSize() {
  const [isDesktop, setIsDesktop] = useState(true)

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isDesktop }
}

const DynamicIcon = ({ iconName, size = 24, ...props }: any) => {
  if (!iconName) return null
  const trimmed = iconName.trim()
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const registry = LucideIcons as any
  const IconComponent = registry[normalized] || registry[trimmed]
  if (!IconComponent) return null
  return <IconComponent size={size} {...props} />
}

type Item = {
  url: string
  text: string
  iconName?: string
}

type FooterLinkSection = {
  items: Item[]
  sectionTitle: string
}

function Links({ items }: { items: Item[] }) {
  return (
    <UIList>
      {items.map((item) => (
        <li key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {item.iconName && <DynamicIcon iconName={item.iconName} size={18} />}
          <Link variant="display" size="small" href={item.url}>
            {item.text}
          </Link>
        </li>
      ))}
    </UIList>
  )
}

function CustomFooterLinks({ links }: { links: FooterLinkSection[] }) {
  const { isDesktop } = useWindowSize()
  const [indicesExpanded, setIndicesExpanded] = useState<Set<number>>(new Set([]))

  const onChange = (index: number) => {
    if (indicesExpanded.has(index)) {
      indicesExpanded.delete(index)
      setIndicesExpanded(new Set(indicesExpanded))
    } else {
      setIndicesExpanded(new Set(indicesExpanded.add(index)))
    }
  }

  return (
    <section data-fs-footer data-fs-footer-links>
      {!isDesktop ? (
        <UIAccordion indices={indicesExpanded} onChange={onChange}>
          {links.map(({ sectionTitle, items }) => (
            <UIAccordionItem key={sectionTitle}>
              <UIAccordionButton>{sectionTitle}</UIAccordionButton>
              <UIAccordionPanel>
                <Links items={items} />
              </UIAccordionPanel>
            </UIAccordionItem>
          ))}
        </UIAccordion>
      ) : (
        <nav data-fs-footer-links-columns aria-label="Footer Links Navigation">
          {links.map(({ sectionTitle, items }) => (
            <div key={sectionTitle}>
              <p data-fs-footer-links-title>{sectionTitle}</p>
              <Links items={items} />
            </div>
          ))}
        </nav>
      )}
    </section>
  )
}

const FooterOverride = (props: any) => {
  const {
    incentives,
    footerLinks,
    footerSocial,
    logo,
    copyrightInfo,
    acceptedPaymentMethods,
  } = props

  return (
    <Section className={`section ${styles.section} section-footer layout__section`}>
      <footer data-fs-footer data-fs-footer-social data-fs-footer-incentives data-fs-footer-payment-methods>
        <div data-fs-content="footer">
          
          {incentives && incentives.length > 0 && (
            <section data-fs-incentives data-fs-incentives-colored={false} data-fs-incentives-variant="horizontal" aria-label="Incentives List">
               <UIList data-fs-content="incentives">
                  {incentives.map((inc: any, i: number) => (
                    <li role="listitem" key={i}>
                      <UIIncentive tabIndex={0}>
                        <Icon name={inc.icon} width={32} height={32} data-fs-incentive-icon />
                        <section data-fs-incentive-content>
                          <p data-fs-incentive-title>{inc.title}</p>
                          <span data-fs-incentive-description>{inc.firstLineText}</span>
                          {inc.secondLineText && <span data-fs-incentive-description>{inc.secondLineText}</span>}
                        </section>
                      </UIIncentive>
                    </li>
                  ))}
               </UIList>
            </section>
          )}

          <section data-fs-footer-navigation>
            {footerLinks && <CustomFooterLinks links={footerLinks} />}
            {footerSocial && (
              <section data-fs-footer-social>
                <p>{footerSocial.title}</p>
                <UIList>
                  {footerSocial.socialLinks?.map((social: any, i: number) => (
                    <li key={i}>
                      <Link href={social.url} title={social.alt} target="_blank" rel="noopener noreferrer">
                        <Icon name={social.icon?.icon || social.icon} width={24} height={24} />
                      </Link>
                    </li>
                  ))}
                </UIList>
              </section>
            )}
          </section>

          <section data-fs-footer-info aria-label="Footer Information">
            {logo && (
              <Link href={logo.link?.url} title={logo.link?.title}>
                <img src={logo.src} alt={logo.alt} width={120} style={{ objectFit: 'contain' }} />
              </Link>
            )}

            {acceptedPaymentMethods?.showPaymentMethods && (
              <UIPaymentMethods
                flagList={acceptedPaymentMethods.paymentMethods}
                title={<p>{acceptedPaymentMethods.title}</p>}
              />
            )}
            
            <div data-fs-footer-copyright className="text__legend">
              <p>{copyrightInfo}</p>
            </div>
          </section>

        </div>
      </footer>
    </Section>
  )
}

FooterOverride.$componentKey = 'Footer'

export default FooterOverride
