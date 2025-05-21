import { ItemInfo } from "../hooks/useItemInfo";
import { AxisNames, FontInfo } from "../hooks/useMapInfo";

/** 軸描画 */
export const drawMapAxis = (ctx: CanvasRenderingContext2D, fontInfo: FontInfo, axisNames: AxisNames) =>
{
    const canvas = ctx.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 背景色描画
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    // X軸描画
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, fontInfo.size);
    ctx.lineTo(canvas.width / 2, canvas.height - fontInfo.size);

    // Y軸描画
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.font = fontInfo.size + "px " + fontInfo.name;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    // Y軸上ラベル描画
    ctx.strokeText(axisNames.yAxisHigh, canvas.width / 2, 5);
    ctx.fillText(axisNames.yAxisHigh, canvas.width / 2, 5);

    // Y軸下ラベル描画
    ctx.textBaseline = "bottom";
    ctx.strokeText(axisNames.yAxisLow, canvas.width / 2, canvas.height);
    ctx.fillText(axisNames.yAxisLow, canvas.width / 2, canvas.height);

    // X軸左ラベル描画
    ctx.textAlign = "left";
    ctx.strokeText(axisNames.xAxisLow, 0, canvas.height / 2);
    ctx.fillText(axisNames.xAxisLow, 0, canvas.height / 2);

    // X軸右ラベル描画
    ctx.textAlign = "right";
    ctx.strokeText(axisNames.xAxisHigh, canvas.width, canvas.height / 2);
    ctx.fillText(axisNames.xAxisHigh, canvas.width, canvas.height / 2);
}

/* 表示アイテム描画 */
export const drawItem = async (ctx: CanvasRenderingContext2D, itemInfo: ItemInfo) =>
{
    const img = new Image();
    img.src = itemInfo.src;

    // 画像がロードされるのを待つ
    await new Promise((resolve: (value: unknown) => void, reject: (reason?: Event | string) => void) =>
    {
        img.onload = resolve;
        img.onerror = reject; // エラーハンドリングも追加
    });

    // アイテムを描画
    ctx.drawImage(img, itemInfo.x, itemInfo.y, itemInfo.dispWidth, itemInfo.dispHeight);
}

/** テキスト描画時のコンテキストを設定 */
const setTextDrawContext = (ctx: CanvasRenderingContext2D, fontInfo: FontInfo) =>
{
    ctx.fillStyle = "black";
    ctx.font = fontInfo.size + "px " + fontInfo.name;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    return ctx;
}

/** テキスト描画時のサイズを取得 */
export const getTextMatrix = (ctx: CanvasRenderingContext2D, fontInfo: FontInfo, text: string) =>
{
    ctx = setTextDrawContext(ctx, fontInfo);
    const matrix = ctx.measureText(text);
    return matrix;
}

/** テキスト描画 */
export const drawText = (ctx: CanvasRenderingContext2D, fontInfo: FontInfo, text: string) =>
{
    // 背景色描画
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // 文字描画
    ctx = setTextDrawContext(ctx, fontInfo);
    ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width);
}