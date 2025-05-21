import { useState } from "react";
import { getCommonFonts } from "../utils/FontUtils";
import { FONT_SIZE_DEFAULT, MAP_SIZE_HEIGHT_DEFAULT, MAP_SIZE_WIDTH_DEFAULT } from "../constants/constants";
import { MapContextType } from "../context/MapContext";

/** 軸ラベル名 */
export interface AxisNames
{
    /** X軸右ラベル */
    xAxisHigh: string;
    /** X軸左ラベル */
    xAxisLow: string;
    /** Y軸上ラベル */
    yAxisHigh: string;
    /** Y軸下ラベル */
    yAxisLow: string;
}

/** マップサイズ */
export interface MapSize
{
    /** 幅 */
    width: number;
    /** 高さ */
    height: number;
}

/** フォント情報 */
export interface FontInfo
{
    /** フォント名 */
    name: string;
    /** フォントサイズ */
    size: number;
}

/** マップ情報カスタムフック */
export const useMapInfo = ():MapContextType =>
{
    // 軸ラベル名状態
    const [axisNames, setAxisNames] = useState<AxisNames>(
        {
            xAxisHigh: "右ラベル",
            xAxisLow: "左ラベル",
            yAxisHigh: "上ラベル",
            yAxisLow: "下ラベル",
        }
    );

    // マップサイズ状態
    const [mapSize, setMapSize] = useState<MapSize>(
        {
            height: MAP_SIZE_HEIGHT_DEFAULT,
            width: MAP_SIZE_WIDTH_DEFAULT,
        }
    );

    // フォント名状態
    const [fontInfo, setFontInfo] = useState<FontInfo>(
        {
            name: getCommonFonts()[0],
            size: FONT_SIZE_DEFAULT,
        }
    );

    return {
        axisNames,
        setAxisNames,
        mapSize,
        setMapSize,
        fontInfo,
        setFontInfo,
    };
};
