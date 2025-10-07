import React, { useEffect } from 'react'

const Handler: React.FC = () => {
  useEffect(() => {
    const contentSelectors = [
      '.vtex-disclosure-layout-1-x-content--content-tam3',
      '.vtex-disclosure-layout-1-x-content--content-tam4',
      '.vtex-disclosure-layout-1-x-content--content-tam6',
      '.vtex-disclosure-layout-1-x-content--content-tam8',
      '.vtex-disclosure-layout-1-x-content--content-tam10',
      '.vtex-disclosure-layout-1-x-content--content-class-12',
    ]

    const allContents = Array.from(
      document.querySelectorAll<HTMLElement>(contentSelectors.join(', '))
    )

    if (allContents.length === 0) return

    const defaultEl = document.querySelector<HTMLElement>(
      '.vtex-disclosure-layout-1-x-content--content-tam3'
    )

    // garante que só um está visível
    const showOnly = (visibleEl: HTMLElement | null) => {
      allContents.forEach(el => {
        const isTarget = el === visibleEl
        el.style.display = isTarget ? 'block' : 'none'
      })
    }

    // inicia com tam3 visível
    showOnly(defaultEl)

    // observa mudanças no DOM causadas pelo disclosure da VTEX
    const observer = new MutationObserver(() => {
      const visibleEls = allContents.filter(
        el => window.getComputedStyle(el).display !== 'none'
      )

      if (visibleEls.length === 0) {
        // se todos ficaram escondidos → reabre o padrão
        showOnly(defaultEl)
      } else if (visibleEls.length > 1) {
        // se mais de um está aberto → fecha os outros
        showOnly(visibleEls[visibleEls.length - 1]) // mantém o último aberto
      }
    })

    // observar mudanças de atributos (classe/display)
    allContents.forEach(el =>
      observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] })
    )

    return () => observer.disconnect()
  }, [])

  return null
}

export default Handler
