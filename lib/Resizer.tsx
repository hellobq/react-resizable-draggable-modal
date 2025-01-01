import React from 'react'
import { FlexibleModalProps } from './FlexibleModal'

type MouseDownProps = { 
  direct: 'right' | 'bottom' | 'bottomRight', 
  event: React.MouseEvent<HTMLElement>
}

type ResizerProps = Pick<FlexibleModalProps, 'horizontalResizable' | 'verticalResizable'> & {
  onMouseDown: ({ direct, event }: MouseDownProps) => void;
}

export default function Resizer({
  horizontalResizable,
  verticalResizable,
  onMouseDown
}: ResizerProps) {
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
