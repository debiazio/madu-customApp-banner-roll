import { useEffect } from 'react'

const RenameSkuLabels = () => {
  useEffect(() => {
    const rename = () => {
      const spans = document.querySelectorAll('span[class*="skuSelectorName"]')

      spans.forEach((span) => {
        const text = span.textContent?.trim()

        switch (text) {
          case 'colour':
            span.textContent = 'Estrutura'
            break
          case 'Cor':
            span.textContent = 'cores das gavetas'
            break
          case 'Color':
            span.textContent = 'cores dos puxadores'
            break
          default:
            break
        }
      })
    }

    // Roda no início
    rename()

    // Observa mudanças no DOM
    const observer = new MutationObserver(() => {
      rename()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup
    return () => observer.disconnect()
  }, [])

  return null
}

export default RenameSkuLabels
