import React, { useRef, useState } from 'react'
import ResizableDraggableModal from './lib'

export default () => {
  const containerRef = useRef()
  const [modalIsOpen, set_modalIsOpen] = useState()

  const closeModal = () => {
    set_modalIsOpen(false)
  }

  return (
    <div className="App">
      <button onClick={() => set_modalIsOpen(!modalIsOpen)}>
        Open modal
      </button>

      <div
        ref={containerRef}
        style={{
          marginTop: 1500,
          position: 'relative',
          height: 500,
          border: '1px solid grey'
        }}
      />

      <ResizableDraggableModal
        // minWidth={300}
        // minHeight={300}
        // initWidth={document.documentElement.clientWidth - 100}
        // initHeight={document.documentElement.clientHeight - 100}
        // mask={false}
        onFocus={() => console.log("Modal is clicked")}
        onClose={closeModal}
        onOk={closeModal}
        visible={modalIsOpen}
        overflowBoundary='hidden'
        // getPopupContainer={() => containerRef.current}
        resetRectOnOpen
        // footer={null}
        // onResize={console.log}
        // horizontalResizable={false}
      >
        <h3>My Modal</h3>
        <div className="body">
          <p>This is the modal&apos;s body.</p>
        </div>
        <button onClick={closeModal}>
          Close modal
        </button>
      </ResizableDraggableModal>
    </div>
  )
}
