import MainSection from './components/MainSection'
import AuthProvider from './auth'
import { TrendSection } from './components/TrendSection'

export default function Home() {
  return (
    <>
      <AuthProvider />
      <MainSection />
      <TrendSection />
    </>
  )
}
