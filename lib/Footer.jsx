import React from 'react'

export default function Footer({
	onClose,
  onOk
}) {
  return (
    <div className='flexible-modal-footer'>
      <button
        onClick={onClose}
        className='cancel'
      >
        cancel
      </button>
      <button
        onClick={onOk}
        className='ok'
      >
        ok
      </button>
    </div>
  )
}
