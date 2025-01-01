import React from 'react'

export interface FooterProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void,
  onOk: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Footer({
  onClose,
  onOk
}: FooterProps) {
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

