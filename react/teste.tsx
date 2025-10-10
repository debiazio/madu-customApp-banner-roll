import React, { useEffect } from 'react'

const Handler: React.FC = () => {
  useEffect(() => {
    // Seletores dos conteúdos
    const contentSelectors = [
      '.vtex-disclosure-layout-1-x-content--content-tam3',
      '.vtex-disclosure-layout-1-x-content--content-tam4',
      '.vtex-disclosure-layout-1-x-content--content-tam6',
      '.vtex-disclosure-layout-1-x-content--content-tam8',
      '.vtex-disclosure-layout-1-x-content--content-tam10',
      '.vtex-disclosure-layout-1-x-content--content-tam12',
    ]

    const allContents = Array.from(
      document.querySelectorAll<HTMLElement>(contentSelectors.join(', '))
    )
    if (allContents.length === 0) return

    const defaultContent = document.querySelector<HTMLElement>(
      '.vtex-disclosure-layout-1-x-content--content-tam3'
    )

    // Verifica se é desktop
    const isDesktop = window.innerWidth >= 1024

    // Só define colunas e lógica extra se for desktop
    const colSelectors = isDesktop
      ? [
          '.vtex-flex-layout-0-x-flexCol--coluna-tam3',
          '.vtex-flex-layout-0-x-flexCol--coluna-tam4',
          '.vtex-flex-layout-0-x-flexCol--coluna-tam6',
          '.vtex-flex-layout-0-x-flexCol--coluna-tam8',
          '.vtex-flex-layout-0-x-flexCol--coluna-tam10',
          '.vtex-flex-layout-0-x-flexCol--coluna-tam12',
        ]
      : []

    const allCols = isDesktop
      ? Array.from(document.querySelectorAll<HTMLElement>(colSelectors.join(', ')))
      : []

    // Função que mostra apenas um conteúdo
    const showOnly = (visibleContent: HTMLElement | null) => {
      // Sempre deve haver pelo menos um visível
      allContents.forEach(el => {
        el.style.display = el === visibleContent ? 'block' : 'none'
      })

      // Só aplica lógica das colunas no desktop
      if (isDesktop) {
        allCols.forEach(col => {
          if (!visibleContent) {
            col.style.display = 'none'
            return
          }
          const match = col.className.includes(
            visibleContent.className.match(/content-(tam\d+|class-\d+)/)?.[1] || ''
          )
          col.style.display = match ? 'block' : 'none'
        })
      }
    }

    // Inicializa com o padrão
    showOnly(defaultContent)

    // Observa mudanças nos conteúdos
    const observer = new MutationObserver(() => {
      const visibleContents = allContents.filter(
        el => window.getComputedStyle(el).display !== 'none'
      )

      if (visibleContents.length === 0) {
        // Se todos estiverem escondidos, mostra o padrão
        showOnly(defaultContent)
      } else if (visibleContents.length > 1 && isDesktop) {
        // Se mais de um, mantém o último aberto (apenas no desktop)
        showOnly(visibleContents[visibleContents.length - 1])
      } else {
        // Apenas 1 visível
        showOnly(visibleContents[0])
      }
    })

    allContents.forEach(el =>
      observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] })
    )

    return () => observer.disconnect()
  }, [])

  return null
}

export default Handler
