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
    <section className={styles.customFooterLinks}>
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
        <nav className={styles.footerLinksColumns} aria-label="Footer Links Navigation">
          {links.map(({ sectionTitle, items }) => (
            <div key={sectionTitle} className={styles.linkColumn}>
              <p className={styles.footerLinksTitle}>{sectionTitle}</p>
              <Links items={items} />
            </div>
          ))}
        </nav>
      )}
    </section>
  )
}

function CustomFooterContacts({ contacts }: { contacts: any }) {
  if (!contacts || !contacts.contactBlocks) return null

  return (
    <div className={styles.footerContacts}>
      <p className={styles.footerLinksTitle}>{contacts.title}</p>
      <div className={styles.contactsGrid}>
        {contacts.contactBlocks.map((block: any, i: number) => (
          <div key={i} className={styles.contactBlock}>
            {block.title && (
              <div className={styles.contactBlockHeader}>
                {block.icon && <DynamicIcon iconName={block.icon} size={20} />}
                <p className={styles.contactBlockTitle}>{block.title}</p>
              </div>
            )}
            <ul className={styles.contactList}>
              {block.items?.map((item: any, j: number) => (
                <li key={j}>
                  {item.link ? (
                    <Link href={item.link} variant="display" size="small">
                      {item.text}
                    </Link>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const FooterOverride = (props: any) => {
  const {
    incentives,
    footerContacts,
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
                        <DynamicIcon iconName={inc.icon} size={32} data-fs-incentive-icon />
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

          <div className={styles.footerMainRow}>
            <section className={styles.footerLeft} aria-label="Footer Information">
              {logo && (
                <Link href={logo.link?.url} title={logo.link?.title}>
                  <img src={logo.src} alt={logo.alt} width={200} style={{ objectFit: 'contain' }} className={styles.footerLogo} />
                </Link>
              )}

              <div data-fs-footer-copyright className={`text__legend ${styles.footerCopy}`}>
                <p>{copyrightInfo}</p>
              </div>

              {acceptedPaymentMethods?.showPaymentMethods && (
                <UIPaymentMethods
                  flagList={acceptedPaymentMethods.paymentMethods}
                  title={<p>{acceptedPaymentMethods.title}</p>}
                />
              )}
            </section>

            <section className={styles.footerRight}>
              <div className={styles.footerNav}>
                {footerLinks && <CustomFooterLinks links={footerLinks} />}
                {footerSocial && (
                  <div className={styles.linkColumn}>
                    <p className={styles.footerLinksTitle}>{footerSocial.title}</p>
                    <ul className={styles.contactList}>
                      {footerSocial.socialLinks?.map((social: any, i: number) => {
                        const iconStr = typeof social.icon === 'string' ? social.icon : social.icon?.icon;
                        return (
                          <li key={i}>
                            <Link href={social.url} title={social.alt} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <DynamicIcon iconName={iconStr} size={20} />
                              <span>{social.alt || iconStr}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                {footerContacts && <CustomFooterContacts contacts={footerContacts} />}
              </div>
            </section>
          </div>

        </div>
      </footer>
    </Section>
  )
}

FooterOverride.$componentKey = 'Footer'

export default FooterOverride
