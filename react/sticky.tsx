import { useEffect } from 'react'

const StickyHeaderBackground = () => {
  useEffect(() => {
    // Encontra o elemento cuja classe contém "--sticky-header"
    const wrapper = Array.from(document.querySelectorAll('[class*="wrapper--sticky-header"]'))
      .find(el => el.className.includes('wrapper--sticky-header')) as HTMLElement

    const container = Array.from(document.querySelectorAll('[class*="container--sticky-header"]'))
      .find(el => el.className.includes('container--sticky-header')) as HTMLElement

    if (!wrapper || !container) return

    const applyBackground = () => {
      const isStuck = wrapper.className.includes('--stuck')
      container.style.backgroundColor = isStuck ? '#7777779c' : 'transparent'
    }

    // Aplicar inicialmente
    applyBackground()

    // Observar mudanças de classe no wrapper
    const observer = new MutationObserver(() => {
      applyBackground()
    })

    observer.observe(wrapper, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return null
}

export default StickyHeaderBackground
