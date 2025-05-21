import { useState } from "react";
import { MapSize } from "./useMapInfo";
import { DragEndEvent } from "@dnd-kit/core";
import { DROPPABLE_CANVAS_ID, ITEM_HEIGHT_DEFAULT } from "../constants/constants";
import { ItemContextType } from "../context/ItemContext";

/**
 * 表示アイテム情報
 */
export interface ItemInfo
{
    /** ID */
    id: string;
    /** ソース */
    src: string;
    /** 元の幅 */
    srcWidth: number;
    /** 元の高さ */
    srcHeight: number;
    /** マップ上にあるかどうか */
    onMap: boolean;
    /** マップ上の位置、X座標 */
    x: number,
    /** マップ上の位置、Y座標 */
    y: number,
    /** マップ上での幅 */
    dispWidth: number,
    /** マップ上での高さ */
    dispHeight: number,
    /** 選択されているかどうか */
    isSelected: boolean
}

/**
 * 表示アイテム情報カスタムフック
 */
export const useItemInfos = (): ItemContextType =>
{
    // 表示アイテム情報配列状態
    const [itemInfos, setItemInfos] = useState<ItemInfo[]>([]);

    // マップサイズ変更
    const changeMapSize = (newMapSize: MapSize, beforeMapSize: MapSize) =>
    {
        const newItems = itemInfos.map(item =>
        {
            // マップ上にある場合、マップサイズに合わせて位置を修正
            if (item.onMap)
            {
                const newX = item.x * newMapSize.width / beforeMapSize.width;
                const newY = item.y * newMapSize.height / beforeMapSize.height;

                return {
                    ...item, // 元のitemのプロパティをコピー
                    x: newX,
                    y: newY,
                };

            }
            else
            {
                return {
                    ...item, // そのままコピーして新しいオブジェクトを作成
                };
            }
        });

        setItemInfos(newItems);
    }

    // 画像サイズ一括変更
    const changeAllItemSize = (rasio: number) =>
    {
        const newItems = itemInfos.map(item =>
        {
            // 新しいサイズを計算
            const newDispWidth = item.srcWidth * (rasio / 100);
            const newDispHeight = item.srcHeight * (rasio / 100);

            // 元のサイズと新しいサイズの差を計算
            const deltaWidth = newDispWidth - item.dispWidth;
            const deltaHeight = newDispHeight - item.dispHeight;

            // 新しい座標の計算
            const newX = item.x - deltaWidth / 2;
            const newY = item.y - deltaHeight / 2;

            return {
                ...item, // 元の情報は全部コピー
                x: newX, // x座標
                y: newY, // y座標
                dispWidth: newDispWidth, // 幅
                dispHeight: newDispHeight, // 高さ
            };
        });

        setItemInfos(newItems);
    };

    // 全画像選択解除
    const unSelectAllItem = () =>
    {
        const newItems = itemInfos.map(item =>
        {
            return {
                ...item,
                isSelected: false,
            };
        });

        setItemInfos(newItems);
    };

    // 表示アイテム選択
    const selectItem = (selectItem: ItemInfo) =>
    {
        const newItems = itemInfos.map(item =>
        {
            return {
                ...item,
                isSelected: (item.id === selectItem.id ? true : false),
            };
        });

        setItemInfos(newItems);
    };

    // 表示アイテムサイズ変更
    const changeItemSize = (selectItem: ItemInfo, rasio: number) =>
    {
        const newItems = itemInfos.map(item =>
        {
            if (item.id === selectItem.id)
            {
                return {
                    ...item,
                    dispWidth: item.dispWidth * rasio,
                    dispHeight: item.dispHeight * rasio,
                };
            }
            else
            {
                return { ...item };
            }
        });

        setItemInfos(newItems);
    };

    // 表示アイテム削除
    const removeItem = (remveItem: ItemInfo) =>
    {
        const newItems = itemInfos.filter(item =>
        {
            return remveItem.id !== item.id;
        });

        setItemInfos(newItems);
    };

    // 表示アイテム追加
    const addItem = (srsText: string, width: number, height: number) =>
    {
        setItemInfos(prev => [...prev, {
            id: crypto.randomUUID(),
            src: srsText,
            srcWidth: width,
            srcHeight: height,
            onMap: false,
            x: 0,
            y: 0,
            dispWidth: width / height * ITEM_HEIGHT_DEFAULT,
            dispHeight: ITEM_HEIGHT_DEFAULT,
            isSelected: false
        }]);
    };

    // ドラッグ終了イベント
    const handleDragEnd = (event: DragEndEvent) =>
    {
        if (!event.over) return;
        if (!event.active) return;

        // activeはドラッグしている要素
        // overはドロップされる要素
        const { active, over, delta } = event;

        if (!active.rect.current.initial) return;

        // リストへのドラッグの場合
        var onMap = false;
        var diffTop = 0;
        var diffLeft = 0;

        // キャンパスへのドラッグの場合
        if (event.over.id === DROPPABLE_CANVAS_ID)
        {
            onMap = true;
            diffTop = (active.rect.current.initial.top + delta.y) - over.rect.top;
            diffLeft = (active.rect.current.initial.left + delta.x) - over.rect.left;
        }

        // アイテム情報を更新
        const newItems = itemInfos.map((item, _index) =>
        {
            if (event.active.id === item.id)
            {
                item.onMap = onMap;
                item.x = diffLeft;
                item.y = diffTop;
            }
            return item;
        });

        setItemInfos(newItems);
    }

    return {
        itemInfos, setItemInfos,
        updateItemPosition: changeMapSize,
        changeAllItemSize,
        unSelectAllItem,
        selectItem,
        changeItemSize,
        removeItem,
        addItem,
        handleDragEnd,
    };

};