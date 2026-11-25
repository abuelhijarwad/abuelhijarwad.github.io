import { usePageMeta } from '../hooks/usePageMeta'
import Hero from '../components/Hero'
import Showcase from '../components/Showcase'
import Industries from '../components/Industries'
import Bridge from '../components/Bridge'
import What from '../components/What'
import Process from '../components/Process'
import CtaBand from '../components/CtaBand'

export default function Home() {
  usePageMeta('home')
  return (
    <>
      <Hero />
      <Showcase />
      <Industries />
      <Bridge />
      <What />
      <Process />
      <CtaBand />
    </>
  )
}
