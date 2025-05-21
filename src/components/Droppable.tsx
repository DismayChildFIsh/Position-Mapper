import { useDroppable } from '@dnd-kit/core';

interface DroppableProps
{
  /** ID */
  id: string;
  /** 子要素 */
  children: React.ReactNode;
}

/** ドロップコンポーネント */
export const Droppable = ({
  id,
  children
}: DroppableProps) =>
{
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  };

  return (
    <div
      ref={ setNodeRef }
      style={ style }
    >
      { children }
    </div>
  );
}