import { useEffect } from 'react'

const RenameSkuLabels = () => {
  useEffect(() => {
    const rename = () => {
      const spans = document.querySelectorAll('span[class*="skuSelectorName"]')

      const translations: Record<string, string> = {
        colour: 'Estrutura',
        cor: 'cores das gavetas',
        color: 'cores dos puxadores',
        couleur: 'cores',
        colore: 'cores',
        farbe: 'cores',
        kleuren: 'cores',
        culoare: 'cores',
        värit: 'cores',
        kolory: 'cores',
        farve: 'cores',
        färger: 'cores',
        farby: 'cores',
        boje: 'cores',
        colori: 'cores',
      }

      spans.forEach((span) => {
        const text = span.textContent?.trim().toLowerCase()
        if (text && translations[text]) {
          span.textContent = translations[text]
        }
      })
    }

    // Executa inicialmente
    rename()

    // Observa mudanças no DOM
    const observer = new MutationObserver(rename)
    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup
    return () => observer.disconnect()
  }, [])

  return null
}

export default RenameSkuLabels
