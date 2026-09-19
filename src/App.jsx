import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Services from './components/Services'
import Niches from './components/Niches'
import About from './components/About'
import Process from './components/Process'
import Benefits from './components/Benefits'
import BeforeAfter from './components/BeforeAfter'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'
import { site, EMAIL, isConfigured, getSiteOrigin } from './data/site'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const origin = getSiteOrigin()

  const person = {
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Web Designer & Developer',
    description: site.seo.description,
    knowsAbout: [
      'Web Design',
      'Landing Pages',
      'Business Websites',
      'Responsive Design',
      'Website Redesign',
    ],
  }

  if (origin) person.url = origin
  if (isConfigured(site.github)) person.sameAs = [site.github]
  if (isConfigured(EMAIL)) person.email = EMAIL

  const service = {
    '@type': 'ProfessionalService',
    name: `${site.name} — разработка сайтов`,
    description: site.seo.description,
    areaServed: 'RU',
    priceRange: '₽₽₽',
    serviceType: [
      'Landing page development',
      'Business website development',
      'Website redesign',
    ],
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
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Niches />
        <About />
        <Process />
        <Benefits />
        <BeforeAfter />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
