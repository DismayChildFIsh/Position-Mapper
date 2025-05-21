import { BsTrash } from "react-icons/bs";
import { ITEM_HEIGHT_DEFAULT } from "../constants/constants";
import { useItemContext } from "../context/ItemContext";
import { ItemInfo } from "../hooks/useItemInfo";
import { Draggable } from "./Draggable";

interface ItemListItemProps
{
    item: ItemInfo;
}

/** 
 * 表示リスト上のアイテムコンポーネント 
 * 選択されると削除ボタンを画像に重ねて表示する。
 */
export const ItemListItem = ({ item }: ItemListItemProps) =>
{
    const {
        selectItem: selectImage,
        removeItem: removeImage,
    } = useItemContext();

    /** 選択時ハンドラ */
    const handleSelectImage = (_event:React.PointerEvent<HTMLImageElement>) =>
    {
        selectImage(item);
    };

    /** 削除ハンドラ */
    const handleRemoveImage = (_event: React.PointerEvent<HTMLButtonElement>) =>
    {
        removeImage(item);
    };

    return (
        <Draggable
            id={ item.id }
            item={ item }
        >
            <div style={ { position: "relative" } }>
                <img
                    src={ item.src }
                    width={ item.srcWidth / item.srcHeight * ITEM_HEIGHT_DEFAULT }
                    height={ ITEM_HEIGHT_DEFAULT }
                    onPointerDown={ handleSelectImage }
                />
                {/* 選択されていた場合、削除ボタン表示 */ }
                { item.isSelected && (
                    <span
                        data-testid="delete-btn"
                        style={ {
                            position: "absolute",
                            left: 0,
                            top: 0,
                        } }
                        onPointerDown={ handleRemoveImage }
                    >
                        {/* ゴミ箱アイコン */}
                        <BsTrash 
                            style={{
                                fontSize:20,
                                color: "Black",
                                background:"White"
                            }}                             
                        />
                    </span>
                ) }
            </div>
        </Draggable>
    );
}