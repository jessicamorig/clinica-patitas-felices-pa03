
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
      return
    }

    let intentos = 0

    const buscarSeccion = () => {
      const id = decodeURIComponent(hash.substring(1))
      const elemento = document.getElementById(id)

      if (elemento) {
        elemento.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        return
      }

      if (intentos < 10) {
        intentos++
        window.setTimeout(buscarSeccion, 100)
      }
    }

    buscarSeccion()
  }, [pathname, hash])

  return null
}
