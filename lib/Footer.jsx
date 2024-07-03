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
        取消
      </button>
      <button
        onClick={onOk}
        className='ok'
      >
        确定
      </button>
    </div>
  )
}
