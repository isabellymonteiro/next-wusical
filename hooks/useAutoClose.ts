import { RefObject, useCallback, useEffect } from 'react'

// https://kittygiraudel.com/2021/03/18/close-on-outside-click/#react

const useAutoClose = (
  setIsOpen: (isOpen: boolean) => void,
  menu: RefObject<HTMLDivElement | HTMLUListElement | null>
) => {
  const handleClosure = useCallback(
    (event: any) => !menu?.current?.contains(event.target) && setIsOpen(false),
    [setIsOpen, menu]
  )

  useEffect(() => {
    window.addEventListener('click', handleClosure)
    window.addEventListener('focusin', handleClosure)

    return () => {
      window.removeEventListener('click', handleClosure)
      window.removeEventListener('focusin', handleClosure)
    }
  }, [handleClosure, menu])
}

export default useAutoClose