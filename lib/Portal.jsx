import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default ({
  container,
  children,
}) => {
  const containerRef = useRef(container)
  const defaultNode = useRef()

  if (!containerRef.current) {
    containerRef.current = document.body
  }
  if (!defaultNode.current) {
    defaultNode.current = document.createElement('div')
    containerRef.current.appendChild(defaultNode.current)
  }

  useEffect(() => {
    return () => {
      if (
        containerRef.current &&
        defaultNode.current
      ) {
        containerRef.current.removeChild(defaultNode.current)
        defaultNode.current = undefined
      }
    }
  }, [])

  return createPortal(
    children,
    defaultNode.current
  )
}
