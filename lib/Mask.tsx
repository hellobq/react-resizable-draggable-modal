import React, { useEffect, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './Mask.scss'
import { FlexibleModalProps } from './FlexibleModal'

type MaskProps = Pick<FlexibleModalProps, 'visible' | 'maskClosable' | 'getPopupContainer'> & {
  container: HTMLElement,
  onCancel: FlexibleModalProps['onClose']
}

export default function Mask({
  visible,
  maskClosable,
  container,
  onCancel,
}: MaskProps) {
  const maskRef = useRef<HTMLDivElement>(null)
  
  const [isVisible, setIsVisible] = useState(false)  // control display
  const [isOpen, setIsOpen] = useState(false)        // control animation

  useEffect(() => {
    if (visible) {
      setIsVisible(true)
    } else {
      setIsOpen(false)
    }
  }, [visible])

  useEffect(() => {
    if (isVisible) {
      setIsOpen(true)
    }
  }, [isVisible])

  return isVisible ? (
    <CSSTransition
      nodeRef={maskRef}
      in={isOpen}
      timeout={300}
      classNames='fade'
      onExited={() => {
        setIsVisible(false)
      }}
    >
      <div
        ref={maskRef}
        className='mask'
        onClick={(e) => {
          if (maskClosable) {
            setIsOpen(false)
            onCancel(e)
          }
        }}
        style={{
          position: container === document.body
            ? 'fixed'
            : 'absolute'
        }}
      >
      </div>
    </CSSTransition>
  ) : null
}
