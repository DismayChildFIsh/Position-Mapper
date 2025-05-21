import { ReactNode } from "react";
import { useItemInfos } from "../hooks/useItemInfo";
import { ItemContextType, ItemContext } from "./ItemContext";

interface ItemContextProviderProps
{
    children: ReactNode;
}

/**
 * 表示アイテム情報コンテキスト提供コンポーネント
 */
export const ItemItemContextProvider = ({ children }: ItemContextProviderProps) =>
{
    // カスタムフックから表示アイテム情報を取得
    const {
        itemInfos,
        setItemInfos,
        updateItemPosition: changeMapSize,
        changeAllItemSize,
        unSelectAllItem,
        selectItem,
        changeItemSize,
        removeItem,
        addItem,
        handleDragEnd,
    } = useItemInfos();

    // 表示アイテム情報をコンテキストに設定
    const itemContext: ItemContextType = {
        itemInfos,
        setItemInfos,
        updateItemPosition: changeMapSize,
        changeAllItemSize,
        unSelectAllItem,
        selectItem,
        changeItemSize,
        removeItem,
        addItem,
        handleDragEnd,
    };

    return (
        <ItemContext value={ itemContext }>
            { children }
        </ItemContext>
    );
};
