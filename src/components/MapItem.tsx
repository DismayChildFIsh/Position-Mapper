import { ITEM_ENLARGE_RATIO, ITEM_SHRINK_RATIO } from "../constants/constants";
import { useItemContext } from "../context/ItemContext";
import { ItemInfo } from "../hooks/useItemInfo";
import { Draggable } from "./Draggable";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

interface MapItemProps
{
    item: ItemInfo;
}

/** 
 * マップアイテムコンポーネント 
 * 選択されると拡大ボタンと縮小ボタンを表示する。
 */
export const MapItem = ({ item }: MapItemProps) =>
{
    const {
        selectItem,
        changeItemSize,
    } = useItemContext();

    /** アイテムクリックハンドラ */
    const handleClickImage = (_event: React.PointerEvent<HTMLImageElement>) =>
    {
        selectItem(item);
    };

    /** 拡大ボタン押下 */
    const handleEnlargeButton = (_event: React.PointerEvent<HTMLButtonElement>) =>
    {
        changeItemSize(item, ITEM_ENLARGE_RATIO);
    }

    /** 縮小ボタン押下 */
    const handleShrinkButton = (_event: React.PointerEvent<HTMLButtonElement>) =>
    {
        changeItemSize(item, ITEM_SHRINK_RATIO);
    }

    return (
        <Draggable
            id={ item.id }
            item={ item }
        >
            <img
                src={ item.src }
                width={ item.dispWidth }
                height={ item.dispHeight }
                onPointerDown={ handleClickImage }
            />
            {/* 選択されていた場合、拡大縮小ボタン表示 */ }
            { item.isSelected && (
                <div
                    style={ {
                        display: 'flex',
                        justifyContent: 'space-between'
                    } }
                >
                    {/* 縮小ボタン */}
                    <span
                        data-testid="shrink-btn"
                        onPointerDown={ handleShrinkButton }
                    >
                        <BsZoomOut 
                            style={{
                                fontSize:20,
                                color: "Black",
                                background:"White"
                            }}                             
                        />
                    </span>
                    {/* 拡大ボタン */}
                    <span
                        data-testid="enlarge-btn"
                        onPointerDown={ handleEnlargeButton }
                    >
                        <BsZoomIn 
                            style={{
                                fontSize:20,
                                color: "Black",
                                background:"White"
                            }}    
                        />
                    </span>
                </div>
            ) }
        </Draggable>
    );
}