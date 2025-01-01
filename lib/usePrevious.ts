import { useRef, useEffect } from 'react'

type PreviousProps<T> = {
  value: T,
  shouldUpdate: boolean | ((prev: T, next: T) => boolean)
}

export default function usePrevious<T>({
  value,
  shouldUpdate
}: PreviousProps<T>) {
  const prevRef = useRef<T>(value)

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
