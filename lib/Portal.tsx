import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  container: HTMLElement,
  children: React.ReactNode
}

export default function Portal({ container, children }: PortalProps) {
  const containerRef = useRef<HTMLElement>(container)
  const defaultNode = useRef<HTMLDivElement | null>()

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
        defaultNode.current = null
      }
    }
  }, [])

  return createPortal(
    children,
    defaultNode.current
  )
}
