# react-resizable-draggable-modal

Resizable draggable modal based on React hooks.

## Install
``` bash
npm i react-resizable-draggable-modal
```

## Usage:
##### In your React component:
```javascript
import ResizableDraggableModal from 'react-resizable-draggable-modal'
import 'react-resizable-draggable-modal/dist/style.css'

<ResizableDraggableModal
  title='My Modal'
  visible={modalIsOpen}
  onClose={closeModal}
  onOk={closeModal}
>
  <div className='body'>
    <p>This is the modal body.</p>
  </div>
</ResizableDraggableModal>
```

## Supported props
|  Property   | Description  | Type | Default
|  ----   | ----  | ---- | ----
|  left   | Init left of the Modal  | `number` | 
|  top   | Init top of the Modal | `number` | 
|  initWidth  | init Width of the Modal | `number` | 600
|  initHeight  | init Height of the Modal | `number` | 400
|  minWidth  | Minimum width when dragging | `number` | 300
|  minHeight  | Minimum height when dragging | `number` | 200
|  resetRectOnOpen  | When opening the modal, whether to reset rect(position and size) | `boolean`
|  draggable  | Is it draggable | `boolean` | true
|  resizable  | Is it resizable | `boolean` | true
|  verticalResizable  | Is it resizable in the vertical direction? | `boolean` | true
|  horizontalResizable  | Is it resizable in the horizontal direction? | `boolean` | true
|  overflowBoundary  | Behavior beyond the parent container's boundaries | `auto` or `hidden` | auto
|  mask  | Whether show mask or not | `boolean` | true
|  maskClosable  | Whether to close the Modal when the mask (area outside the modal) is clicked | `boolean` |
|  visible  | Is the modal open? | `boolean` |
|  getPopupContainer  | To set the container of the Modal. The default is to create a div element in body, but you can reset it to the scrolling area and make a relative reposition. | `function` | () => document.body
|  className  | The class name of the modal | `string` |
|  title  | The title of the modal | `string` | title
|  onDrag  | Dragging the Modal is triggered | `function` |
|  onResize  | Dragging the Modal is triggered | `function` |
|  footer  | Footer content, set as footer={null} when you don't need default buttons | `ReactNode` |
|  onClose  | Click the cancel button on the left side of the footer | `function` |
|  onOk  | Click the ok button on the right side of the footer | `function` |
