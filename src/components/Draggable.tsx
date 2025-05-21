import { CSSProperties } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ItemInfo } from '../hooks/useItemInfo';

interface DraggableProps
{
  /** ID */
  id: string;
  /** 表示アイテム情報 */
  item: ItemInfo;
  /** 子要素 */
  children: React.ReactNode;
}

/** ドラッグコンポーネント */
export const Draggable = ({
  id,
  item,
  children
}: DraggableProps) =>
{
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  /** ドラッグ中の要素を表示するために必要 */
  const transStyle: CSSProperties = (transform ? {
    transform: `translate3d(${ transform.x }px, ${ transform.y }px, 0)`,
  } : {});

  /** 表示アイテムの位置 */
  const itemStyle: CSSProperties = (item.onMap ? {
    position: 'absolute',
    top: item.y,
    left: item.x
  } : {})

  const style: CSSProperties = {
    ...transStyle,
    ...itemStyle
  }

  return (
    <div
      ref={ setNodeRef }
      style={ style }
      { ...listeners }
      { ...attributes }
    >
      { children }
    </div>
  );
}