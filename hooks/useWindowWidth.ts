import { useState, useEffect } from 'react'

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowWidth
}