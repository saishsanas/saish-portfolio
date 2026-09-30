import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'
import React from 'react'

interface AudioContextType {
  isMuted: boolean
  toggleSound: () => void
  playClick: () => void
  playHover: () => void
  playSuccess: () => void
  playSelect: () => void
}

const AudioFxContext = createContext<AudioContextType>({
  isMuted: true,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
  playSuccess: () => {},
  playSelect: () => {},
})

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saish_portfolio_sound')
      return saved !== null ? saved === 'muted' : true // Default muted for respectful UX
    }
    return true
  })

  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)

  useEffect(() => {
    // Lazy initialize on first interaction
    const initAudio = () => {
      if (!audioCtx && typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioContextClass) {
          const ctx = new AudioContextClass()
          setAudioCtx(ctx)
        }
      }
    }

    window.addEventListener('click', initAudio, { once: true })
    window.addEventListener('keydown', initAudio, { once: true })

    return () => {
      window.removeEventListener('click', initAudio)
      window.removeEventListener('keydown', initAudio)
    }
  }, [audioCtx])

  const toggleSound = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem('saish_portfolio_sound', next ? 'muted' : 'unmuted')
      }
      return next
    })
  }, [])

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, gainValue = 0.04) => {
    if (isMuted || !audioCtx) return

    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime)

      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration)

      osc.connect(gain)
      gain.connect(audioCtx.destination)

      osc.start()
      osc.stop(audioCtx.currentTime + duration)
    } catch {
      // Audio fallback fail-safe
    }
  }, [isMuted, audioCtx])

  const playClick = useCallback(() => {
    playTone(850, 'triangle', 0.04, 0.03)
  }, [playTone])

  const playHover = useCallback(() => {
    playTone(1200, 'sine', 0.015, 0.015)
  }, [playTone])

  const playSelect = useCallback(() => {
    playTone(520, 'sine', 0.08, 0.035)
  }, [playTone])

  const playSuccess = useCallback(() => {
    if (isMuted || !audioCtx) return
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume()
      const now = audioCtx.currentTime
      const osc1 = audioCtx.createOscillator()
      const osc2 = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      osc1.frequency.setValueAtTime(587.33, now) // D5
      osc2.frequency.setValueAtTime(880.00, now + 0.08) // A5

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(audioCtx.destination)

      osc1.start(now)
      osc1.stop(now + 0.08)
      osc2.start(now + 0.08)
      osc2.stop(now + 0.25)
    } catch {
      // Audio context fail-safe
    }
  }, [isMuted, audioCtx])

  return (
    <AudioFxContext.Provider value={{ isMuted, toggleSound, playClick, playHover, playSuccess, playSelect }}>
      {children}
    </AudioFxContext.Provider>
  )
}

export const useAudioFx = () => useContext(AudioFxContext)
