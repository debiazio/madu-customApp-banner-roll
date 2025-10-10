import React, { useEffect } from 'react'

const ShowDropdownMobile: React.FC = () => {
  useEffect(() => {
    const waitForContents = setInterval(() => {
      const allContents = Array.from(
        document.querySelectorAll<HTMLElement>('.vtex-disclosure-layout-1-x-content')
      )

      if (allContents.length === 0) return // ainda não carregou

      clearInterval(waitForContents) // agora sim, pode continuar

      const defaultContent =
        allContents.find(el => el.className.includes('content-tam3')) || allContents[0] || null

      const showOnly = (visibleContent: HTMLElement | null) => {
        allContents.forEach(el => {
          el.style.display = el === visibleContent ? 'block' : 'none'
        })
      }

      // Inicializa por padrão
      showOnly(defaultContent)

      // Observa mudanças nos conteúdos
      const observer = new MutationObserver(() => {
        const visibleContents = allContents.filter(
          el => window.getComputedStyle(el).display !== 'none'
        )

        if (visibleContents.length === 0) {
          showOnly(defaultContent)
        } else if (visibleContents.length > 1) {
          showOnly(visibleContents[visibleContents.length - 1])
        } else {
          showOnly(visibleContents[0])
        }
      })

      allContents.forEach(el =>
        observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] })
      )

      return () => observer.disconnect()
    }, 300) // tenta a cada 300ms até achar

    return () => clearInterval(waitForContents)
  }, [])

  return null
}

export default ShowDropdownMobile
