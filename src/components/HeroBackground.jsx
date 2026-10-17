import { useEffect, useRef } from 'react'

export default function HeroBackground() {
  const sceneRef = useRef(null)
  const destroyRef = useRef(null)

  useEffect(() => {
    const el = sceneRef.current
    if (!el) return

    let destroyed = false

    const script = document.createElement('script')
    script.src = '/unicornStudio.umd.js'
    script.async = true

    script.onload = () => {
      if (destroyed) return
      const US = window.UnicornStudio
      if (!US) return

      US.addScene({
        element: el,
        filePath: '/superintelligence-bg.json',
        fps: 24,
        scale: 1,
        dpi: 1,
        lazyLoad: false,
      }).then((scene) => {
        if (destroyed && scene) scene.destroy()
        else destroyRef.current = () => scene && scene.destroy()
      }).catch(() => {})
    }

    document.head.appendChild(script)

    return () => {
      destroyed = true
      if (destroyRef.current) destroyRef.current()
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <div aria-hidden="true" className="_backgroundAnimation_15jea_2 hero-bg">
      <div className="_animationContainer_15jea_14 _fadeIn_15jea_37" style={{ width: '100%', height: '100%' }}>
        <div
          ref={sceneRef}
          style={{ position: 'relative', width: '100%', height: 'calc(100vh - 100px)' }}
        />
      </div>
    </div>
  )
}
