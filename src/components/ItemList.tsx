import { Droppable } from "./Droppable";
import { useItemContext } from "../context/ItemContext";
import { ItemListItem } from "./ItemListItem";
import { DROPPABLE_ITEM_LIST_ID, ITEM_HEIGHT_DEFAULT } from "../constants/constants";

/** 表示アイテムリストコンポーネント */
export const ItemList = () =>
{
    const {
        itemInfos,
    } = useItemContext();

    return (
        <Droppable id={DROPPABLE_ITEM_LIST_ID}>
            <div
                style={ {
                    minHeight: ITEM_HEIGHT_DEFAULT,
                    display: "flex",
                    flexWrap: "wrap"
                } }
            >
                { itemInfos.map((item, _index) => (
                    // マップ上にない画像を表示
                    !item.onMap && (
                        <ItemListItem
                            item={ item }
                            key={ item.id }
                        />
                    )
                )) }
            </div>
        </Droppable>
    );
};