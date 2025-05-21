import { createContext, useContext } from "react";
import { ItemInfo } from "../hooks/useItemInfo";
import { MapSize } from "../hooks/useMapInfo";
import { DragEndEvent } from "@dnd-kit/core";

/** 表示アイテムコンテキスト */
export interface ItemContextType
{
    /** 表示アイテム情報配列 */
    itemInfos: ItemInfo[];
    /** 表示アイテム情報配列更新 */
    setItemInfos: React.Dispatch<React.SetStateAction<ItemInfo[]>>;
    /** マップサイズ変更 */
    updateItemPosition: (newMapSize: MapSize, beforeMapSize: MapSize) => void;
    /** 表示アイテムサイズ一括変更 */
    changeAllItemSize: (rasio: number) => void;
    /** 全表示アイテム選択解除 */
    unSelectAllItem: () => void;
    /** 表示アイテム選択 */
    selectItem: (selectItem: ItemInfo) => void;
    /** 表示アイテムサイズ変更 */
    changeItemSize: (selectItem: ItemInfo, rasio: number) => void;
    /** 表示アイテム削除 */
    removeItem: (remveItem: ItemInfo) => void;
    /** 表示アイテム追加 */
    addItem: (srsText: string, width: number, height: number) => void;
    /** ドラッグ終了イベント */
    handleDragEnd: (event: DragEndEvent) => void
}

/** 表示アイテムコンテキスト */
export const ItemContext = createContext<ItemContextType | undefined>(undefined);

/** 
 * 表示アイテムコンテキストを使用するためのフック関数 
 * @returns 表示アイテムコンテキスト
*/
export const useItemContext = (): ItemContextType =>
{
    // 表示アイテムコンテキストを取得
    const ctx = useContext(ItemContext);
    if (!ctx)
    {
        throw new Error('アイテムコンテキスト取得エラー。useItemContext は、<ItemContextProvider>内で使用する必要があります。');
    }

    return ctx;
};