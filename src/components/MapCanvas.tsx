import { useEffect, useRef } from "react";
import { Droppable } from "./Droppable";
import { useMapContext } from "../context/MapContext";
import { useItemContext } from "../context/ItemContext";
import { drawMapAxis } from "../utils/CanvasDrawer";
import { MapItem } from "./MapItem";
import { DROPPABLE_CANVAS_ID } from "../constants/constants";

/** 
 * マップコンポーネント 
 * キャンパスでは軸とラベルのみ描画。
 * アイテムはキャンパスの上に重ねて表示させる。
 * */
export const MapCanvas = () =>
{
    const {
        axisNames,
        fontInfo,
        mapSize,
    } = useMapContext();

    const {
        itemInfos,
        unSelectAllItem: unSelectAllImage,
    } = useItemContext();

    // キャンパスへの参照
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() =>
    {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // 軸描画
        drawMapAxis(ctx, fontInfo, axisNames);
    }, [axisNames, fontInfo, mapSize, itemInfos]);

    /** マップクリックハンドラ */
    const handleCanvasClick = (_event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>
    {
        // 選択全解除
        unSelectAllImage();
    };

    return (
        <Droppable id={ DROPPABLE_CANVAS_ID }>
            <div style={ { position: "relative" } }>
                <canvas
                    ref={ canvasRef }
                    width={ mapSize.width }
                    height={ mapSize.height }
                    onClick={ handleCanvasClick }
                >
                </canvas>
                { itemInfos.map((item, _index) => (
                    // マップ上にあるアイテムを表示
                    item.onMap && (
                        <MapItem
                            item={ item }
                            key={ item.id }
                        />
                    )
                )) }
            </div>
        </Droppable>
    );

};