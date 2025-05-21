import { ReactNode } from "react";
import { MapContext, MapContextType } from "./MapContext";
import { useMapInfo } from "../hooks/useMapInfo";

interface MapContextProviderProps
{
    children: ReactNode;
}

/** マップコンテキスト提供コンポーネント */
export const MapContextProvider = ({ children }: MapContextProviderProps) =>
{
    // マップ情報取得
    const {
        axisNames, setAxisNames,
        mapSize, setMapSize,
        fontInfo, setFontInfo
    } = useMapInfo();

    // マップ情報コンテキスト設定
    const mapContext: MapContextType = {
        axisNames, setAxisNames,
        mapSize, setMapSize,
        fontInfo, setFontInfo,
    };

    return (
        <MapContext value={ mapContext }>
            { children }
        </MapContext>
    );
};
