import { createContext, useContext } from "react";
import { AxisNames, FontInfo, MapSize } from "../hooks/useMapInfo";

/** マップコンテキスト */
export interface MapContextType
{
    /** 軸ラベル名 */
    axisNames: AxisNames;
    /** 軸ラベル名更新 */
    setAxisNames: React.Dispatch<React.SetStateAction<AxisNames>>;
    /** マップサイズ */
    mapSize: MapSize;
    /** マップサイズ更新 */
    setMapSize: React.Dispatch<React.SetStateAction<MapSize>>;
    /** フォント情報 */
    fontInfo: FontInfo;
    /** フォント情報更新 */
    setFontInfo: React.Dispatch<React.SetStateAction<FontInfo>>;
}

/** マップコンテキスト */
export const MapContext = createContext<MapContextType | undefined>(undefined);

/** マップコンテキスト取得 */
export const useMapContext = (): MapContextType =>
{
    const ctx = useContext(MapContext);
    if (!ctx)
    {
        throw new Error('マップコンテキスト取得エラー。useMapContext は、<MapContextProvider>内で使用する必要があります。');
    }

    return ctx;
};