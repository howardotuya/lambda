import { useState, useEffect, useRef } from 'react'

export default function FontSwap({ children, delay = 0, loopDuration = 11000 }) {
  const [phase, setPhase] = useState('normal')
  const timersRef = useRef([])

  useEffect(() => {
    const clear = () => timersRef.current.forEach(clearTimeout)

    const runCycle = () => {
      setPhase('pixel')
      timersRef.current.push(setTimeout(() => setPhase('pixel-no-highlight'), 500))
      timersRef.current.push(setTimeout(() => setPhase('normal'), 1500))
    }

    const initial = setTimeout(() => {
      runCycle()
      const interval = setInterval(runCycle, loopDuration)
      timersRef.current.push(interval)
    }, delay)

    timersRef.current.push(initial)
    return () => {
      clear()
      clearInterval(timersRef.current[timersRef.current.length - 1])
    }
  }, [delay, loopDuration])

  return (
    <span
      className="font-swap-island"
      data-highlight={phase === 'normal' ? undefined : phase}
    >
      <span
        aria-hidden="true"
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', fontFamily: 'var(--font-pixel)' }}
      >
        {children}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)' }}>
        <span>{children}</span>
      </span>
    </span>
  )
}
