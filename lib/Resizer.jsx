import React from 'react'

export default function Resizer({
  horizontalResizable,
  verticalResizable,
  onMouseDown
}) {
  return (
    <>
      {
        horizontalResizable &&
          <div
            className='flexible-modal-right-resizer'
            onMouseDown={(event) => {
              onMouseDown({
                direct: 'right',
                event
              })
            }}
          />
      }
      
      {
        verticalResizable &&
          <div
            className='flexible-modal-bottom-resizer'
            onMouseDown={(event) => {
              onMouseDown({
                direct: 'bottom',
                event
              })
            }}
          />
      }

      {
        (
          horizontalResizable || 
          verticalResizable
        ) &&
          <div
            className='flexible-modal-resizer'
            onMouseDown={(event) => {
              onMouseDown({
                direct: 'bottomRight',
                event
              })
            }}
          />
      }
    </>
  )
}
