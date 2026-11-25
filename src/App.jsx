import { ThemeProvider } from './theme'
import { I18nProvider, useI18n } from './i18n'
import { Router, useRouter } from './router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Team from './pages/Team'
import NotFound from './pages/NotFound'
import { useGlobalSpotlight } from './hooks/useSpotlight'

const routes = { '/': Home, '/about': About, '/team': Team, '/contact': Contact }

function Shell() {
  const { path } = useRouter()
  const { t } = useI18n()
  const Page = routes[path] ?? NotFound
  useGlobalSpotlight()
  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-full bg-accent px-5 py-3 text-on-accent transition focus:translate-y-0"
      >
        {t.nav.skip}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <div key={path} className="page-in">
          <Page />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Router>
          <Shell />
        </Router>
      </I18nProvider>
    </ThemeProvider>
  )
}
