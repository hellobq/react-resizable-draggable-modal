import { useRef, useEffect } from 'react'

export default function usePrevious({
  value,
  shouldUpdate
}) {
  const prevRef = useRef()

  useEffect(() => {
    if (
      typeof shouldUpdate === 'function' && shouldUpdate(prevRef.current, value) ||
      shouldUpdate
    ) {
      prevRef.current = value
    }
  })

  return prevRef.current
}
