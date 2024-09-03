import React, { useRef, useState, useEffect, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'

import Portal from './Portal'
import Mask from './Mask'
import Header from './Header'
import Footer from './Footer'
import Resizer from './Resizer'
import './index.scss'
import usePrevious from './usePrevious'

export default function FlexibleModal({
  left,
  top,
  initWidth = 600,
  initHeight = 400,
  minWidth = 300,
  minHeight = 200,

  // When opening, reset the Modal size and position
  resetRectOnOpen,

  draggable = true,
  resizable = true,
  verticalResizable = true,
  horizontalResizable = true,

  /**
   * Whether it is allowed to exceed the parent container. 
   *   auto means exceeding the parent container by default
   *   forbidden means not exceeding the parent container
   */
  overflowBoundary = 'auto',

  mask = true,
  maskClosable,

  visible,
  getPopupContainer = () => document.body,
  className,
  title = 'title',
  children,

  onDrag,
  onResize,
  footer,
  onClose,
  onOk,
}) {
  const container = getPopupContainer()
  const [_isVisible, set_isVisible] = useState()
  const [_isOpen, set_isOpen] = useState()

  const node_modal_ref = useRef()

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [onlyVerticalResize, setOnlyVerticalResize] = useState(false)
  const [onlyHorizontalResize, setOnlyHorizontalResize] = useState(false)

  const [_full, set_full] = useState(false)
  const [_left, set_left] = useState(0)
  const [_top, set_top] = useState(0)
  const [width, setWidth] = useState(initWidth)
  const [height, setHeight] = useState(initHeight)

  const prev_left = usePrevious({
    value: _left,
    shouldUpdate: !_full
  })
  const prev_top = usePrevious({
    value: _top,
    shouldUpdate: !_full
  })
  const prev_width = usePrevious({
    value: width,
    shouldUpdate: !_full
  })
  const prev_height = usePrevious({
    value: height,
    shouldUpdate: !_full
  })
  const [point, setPoint] = useState({})

  function initLeft() {
    let containerWidth = container === document.body
      ? window.innerWidth
      : container.offsetWidth
    return left !== undefined
      ? left
      : containerWidth / 2 - initWidth / 2
  }

  function initTop() {
    let containerHeight = container === document.body
      ? window.innerHeight
      : container.offsetHeight
    return top !== undefined
      ? top
      : containerHeight / 2 - initHeight / 2
  }

  useEffect(() => {
    if (container) {
      set_left(initLeft())
      set_top(initTop())
    }
  }, [container])

  useEffect(() => {
    if (visible) {
      set_isVisible(true)
      container.classList.add('container-hidden')
    } else {
      set_isOpen(false)
      container.classList.remove('container-hidden')
    }
  }, [visible])

  useEffect(() => {
    if (_isVisible) {
      set_isOpen(true)

      if (resetRectOnOpen) {
        set_left(initLeft)
        set_top(initTop)
        setWidth(initWidth)
        setHeight(initHeight)
      }
    }
  }, [_isVisible])

  useEffect(() => {
    if (!_isVisible) return

    let _left, _top, width, height
    if (_full) {
      let containerWidth = container === document.body
        ? window.innerWidth
        : container.offsetWidth
      let containerHeight = container === document.body
        ? window.innerHeight
        : container.offsetHeight

      _left = _top = 0
      width = containerWidth
      height = containerHeight
    } else {
      _left = prev_left
      _top = prev_top
      width = prev_width
      height = prev_height
    }

    set_left(_left)
    set_top(_top)
    setWidth(width)
    setHeight(height)
    onResize?.({
      x: _left,
      y: _top,
      width,
      height
    })
  }, [_full])

  const onMouseDown = useCallback((e) => {
    /**
     * The left mouse button is not pressed
     */
    if (e.button !== 0) return

    const node_modal = node_modal_ref.current
    setIsDragging(true)
    setPoint({
      x: e.pageX - node_modal.offsetLeft,
      y: e.pageY - node_modal.offsetTop,
    })
    e.stopPropagation()
    e.preventDefault()
  }, [])

  // Change size
  const _resize = (clientX, clientY) => {
    const node_modal = node_modal_ref.current

    let left = 0, top = 0
    if (container !== document.body) {
      let rect = container.getBoundingClientRect()
      left = rect.left
      top = rect.top
    }

    let containerWidth = container === document.body
      ? window.innerWidth
      : container.offsetWidth
    let containerHeight = container === document.body
      ? window.innerHeight
      : container.offsetHeight

    let newWidth = width
    let newHeight = height

    if (
      horizontalResizable &&
      !onlyVerticalResize &&
      clientX > node_modal.offsetLeft + minWidth
    ) {
      newWidth = clientX - left - node_modal.offsetLeft + 16 / 2

      if (overflowBoundary === 'hidden') {
        if (_left + newWidth >= containerWidth) {
          newWidth = containerWidth - _left
        }
      }
      setWidth(newWidth)
    }

    if (
      verticalResizable &&
      !onlyHorizontalResize &&
      clientY > node_modal.offsetTop + minHeight
    ) {
      newHeight = clientY - top - node_modal.offsetTop + 16 / 2

      if (overflowBoundary === 'hidden') {
        if (_top + newHeight >= containerHeight) {
          newHeight = containerHeight - _top
        }
      }
      setHeight(newHeight)
    }

    onResize?.({
      x: node_modal.offsetLeft,
      y: node_modal.offsetTop,
      width: newWidth,
      height: newHeight
    })
  }

  // Change position
  const _onDrag = (pageX, pageY) => {
    const node_modal = node_modal_ref.current

    let _left = pageX - point.x
    let _top = pageY - point.y

    if (overflowBoundary === 'hidden') {
      if (_left <= 0) {
        _left = 0
      }
      if (_top <= 0) {
        _top = 0
      }

      let containerWidth = container === document.body
        ? window.innerWidth
        : container.offsetWidth
      let containerHeight = container === document.body
        ? window.innerHeight
        : container.offsetHeight

      if (
        _left + node_modal.offsetWidth >= containerWidth
      ) {
        _left = containerWidth - node_modal.offsetWidth
      }
      if (
        _top + node_modal.offsetHeight > containerHeight
      ) {
        _top = containerHeight - node_modal.offsetHeight
      }
    }

    onDrag?.({
      x: _left,
      y: _top,
      width: node_modal.offsetWidth,
      height: node_modal.offsetHeight
    })

    set_left(_left)
    set_top(_top)
  }

  const onMouseMove = useCallback((e) => {
    // console.log(isDragging, isResizing, point)
    if (isDragging && point) {
      _onDrag(e.pageX, e.pageY)
    } else if (isResizing) {
      _resize(e.clientX, e.clientY)
    }
    e.stopPropagation()
    e.preventDefault()
  }, [isDragging, point, isResizing])

  const onMouseUp = useCallback((e) => {
    document.removeEventListener('mousemove', onMouseMove)
    setIsDragging(false)
    setIsResizing(false)
    setOnlyVerticalResize(false)
    setOnlyHorizontalResize(false)
    e.stopPropagation()
  }, [onMouseMove])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    if (
      isDragging ||
      isResizing
    ) {
      document.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove, onMouseUp])

  return container ? (
    <Portal
      container={container}
    >
      {
        mask &&
          <Mask
            visible={visible}
            maskClosable={maskClosable}
            onCancel={onClose}
            getPopupContainer={getPopupContainer}
          />
      }

      {
        _isVisible
          ? <CSSTransition
              in={_isOpen}
              timeout={300}
              classNames='fade-scale'
              nodeRef={node_modal_ref}
              onExited={() => {
                set_isVisible(false)
                set_full()
              }}
            >
              <div
                ref={node_modal_ref}
                draggable={isDragging}
                className={'flexible-modal ' + className}
                style={{
                  position: container === document.body
                    ? 'fixed'
                    : 'absolute',
                  top: _top,
                  left: _left,
                  width,
                  height,
                  userSelect: isResizing && 'none',
                  borderRadius: _full && 0
                }}
              >
                <Header
                  title={title}
                  draggable={draggable}
                  isDragging={isDragging}
                  onMouseDown={onMouseDown}
                  full={_full}
                  set_full={set_full}
                  onClose={onClose}
                />

                <div className='flexible-modal-body'>
                  {children}
                </div>

                {
                  footer !== null &&
                    <Footer
                      onClose={onClose}
                      onOk={onOk}
                    />
                }

                {
                  !_full &&
                  resizable &&
                    <Resizer
                      horizontalResizable={horizontalResizable}
                      verticalResizable={verticalResizable}
                      onMouseDown={({ direct }) => {
                        setIsResizing(true)

                        if (direct === 'right') {
                          setOnlyHorizontalResize(true)
                        } else if (direct === 'bottom') {
                          setOnlyVerticalResize(true)
                        } else if (direct === 'bottomRight') {
                        }
                      }}
                    />
                }
              </div>
            </CSSTransition>
          : null
      }
    </Portal>
  ) : null
}
