import { useEffect, useRef, useState } from "react";
import { useMapContext } from "../context/MapContext";
import { useItemContext } from "../context/ItemContext";
import { checkOrigin } from "../utils/HtmlUtils";
import { drawItem, drawMapAxis } from "../utils/CanvasDrawer";

/** ダウンロードリンクコンポーネント */
export const DownloadLink = () =>
{
    const {
        itemInfos,
    } = useItemContext();

    const {
        axisNames,
        fontInfo,
        mapSize,
    } = useMapContext();

    // これらの値が変更されたらダウンロードリンクを更新する
    const dependencyList = [axisNames, fontInfo, mapSize, itemInfos];

    // 現在のURL
    const [dataUrl, setDataUrl] = useState<string>("");
    // 描画用キャンパスへの参照
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() =>
    {
        const generateAndSetDataUrl = async () =>
        {
            // URL生成
            const newUrl = await generateMapDataURL();
            // URL更新
            setDataUrl(newUrl);
        }

        generateAndSetDataUrl();
        
    }, dependencyList);

    // マップ画像を生成し、DataURLとして返す
    const generateMapDataURL = async () =>
    {
        const drawCanvas = drawCanvasRef.current
        if (!drawCanvas) return "";

        drawCanvas.width = mapSize.width;
        drawCanvas.height = mapSize.height;

        const ctx = drawCanvas.getContext('2d');
        if (!ctx) return "";

        // 軸描画
        drawMapAxis(ctx, fontInfo, axisNames);
        
        var isOrigin = true;

        for (const itemInfo of itemInfos)
        {
            // マップ上にあるか
            if (!itemInfo.onMap)
            {
                continue;
            }

            // アイテム描画
            await drawItem(ctx, itemInfo);
            
            // アイテムがオリジンかチェック
            if (!checkOrigin(itemInfo.src))
            {
                isOrigin = false;
            }
        }

        // アイテムがオリジンの場合、URLを作成
        if (isOrigin)
        {
            const dataUrl = drawCanvas.toDataURL('image/png');
            return dataUrl;
        }
        return "";
    }

    return (
        <div>
            { (dataUrl.length > 0) && (
                <a href={ dataUrl }>
                    ダウンロード(右クリックから名前を付けて保存)
                </a>
            ) }
            { (dataUrl.length === 0) && (
                <div>
                    ダウンロードできません。スクリーンショットで保存してください
                </div>
            ) }
            <canvas ref={ drawCanvasRef } style={ { display: "none" } } />
        </div>
    );
}