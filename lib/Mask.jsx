import React, { useEffect, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './Mask.scss'

export default ({
  visible,
  maskClosable,
  getPopupContainer,
  onCancel,
}) => {
  const maskRef = useRef()
  
  const [isVisible, setIsVisible] = useState()  // control display
  const [isOpen, setIsOpen] = useState()        // control animation

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
          position: getPopupContainer() === document.body
            ? 'fixed'
            : 'absolute'
        }}
      >
      </div>
    </CSSTransition>
  ) : null
}
