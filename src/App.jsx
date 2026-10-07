import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Benefits from './components/Benefits'
import Pricing from './components/Pricing'
import Process from './components/Process'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import StickyContact from './components/StickyContact'
import { site, CONTACT_EMAIL, isConfigured, getSiteOrigin } from './data/site'
import { scrollToId } from './utils/scroll'

export default function App() {
  const origin = getSiteOrigin()
  const [packagePrefill, setPackagePrefill] = useState('')
  const [prefillNonce, setPrefillNonce] = useState(0)

  const selectPackage = (formValue) => {
    setPackagePrefill(formValue)
    setPrefillNonce((n) => n + 1)
    scrollToId('contact')
  }

  const person = {
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Веб-мастер',
    description: site.seo.description,
    knowsAbout: [
      'Разработка сайтов',
      'Сайты для малого бизнеса',
      'Адаптивный дизайн',
      'Лендинги',
    ],
  }

  if (origin) person.url = origin
  if (isConfigured(site.github)) person.sameAs = [site.github]
  if (isConfigured(CONTACT_EMAIL)) person.email = CONTACT_EMAIL

  const service = {
    '@type': 'ProfessionalService',
    name: `${site.name} — разработка сайтов для малого бизнеса`,
    description: site.seo.description,
    areaServed: 'RU',
    priceRange: 'от 15 000 ₽',
    serviceType: ['Компактный сайт', 'Индивидуальный сайт', 'Сайт для малого бизнеса'],
  }

  if (origin) service.url = origin
  if (origin) {
    const og = String(site.seo.ogImage || 'og-image.webp').replace(/^\//, '')
    service.image = `${origin}/${og}`
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [person, service],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a className="skip-link" href="#top">
        Перейти к содержимому
      </a>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Pricing onSelectPackage={selectPackage} />
        <Benefits />
        <Process />
        <FAQ />
        <FinalCTA packagePrefill={packagePrefill} prefillNonce={prefillNonce} />
      </main>
      <Footer />
      <StickyContact />
    </>
  )
}
