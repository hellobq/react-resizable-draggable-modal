export type Point = {
  x: number; 
  y: number; 
}

interface DrapProps {
  x: number; 
  y: number; 
  width: number; 
  height: number
}

export interface FlexibleModalProps {
  left?: number;
  top?: number;
  initWidth?: number;
  initHeight?: number;
  minWidth?: number;
  minHeight?: number;

  // When opening, reset the Modal size and position
  resetRectOnOpen?: boolean;

  draggable?: boolean;
  resizable?: boolean;
  verticalResizable?: boolean;
  horizontalResizable?: boolean;

  /**
   * Whether it is allowed to exceed the parent container. 
   *   auto means exceeding the parent container by default
   *   forbidden means not exceeding the parent container
   */
  overflowBoundary?: 'auto' | 'hidden';

  mask?: boolean;
  maskClosable?: boolean;

  visible: boolean;
  getPopupContainer?: () => HTMLElement;
  className?: string;
  title?: string;
  children: React.ReactNode;

  onDrag?: (drapProps: DrapProps) => void;
  onResize?: (resizeProps: DrapProps) => void;
  footer?: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}