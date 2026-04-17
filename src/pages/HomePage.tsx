import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import Works from '../components/sections/Works'
import Services from '../components/sections/Services'
import WhyChooseUs from '../components/sections/WhyChooseUs'
// import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import Partners from '../components/sections/Partners'
import CTABanner from '../components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Works />
      <Services />
      <WhyChooseUs />
      {/* <Testimonials /> */}
      <FAQ />
      <Partners />
      <CTABanner />
    </>
  )
}
