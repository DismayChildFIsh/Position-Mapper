import { MapCanvas } from "./MapCanvas";
import { DownloadLink } from "./DownloadLink";
import { ItemList } from "./ItemList";
import { DndContext } from "@dnd-kit/core";
import { useItemContext } from "../context/ItemContext";

/** ドラッグアンドドロップエリアコンポーネント */
export const DropArea = () =>
{
    const { handleDragEnd } = useItemContext();

    return (
        <DndContext onDragEnd={ handleDragEnd }>
            <div style={{textAlign: "center"}}>
                <div style={{display:"inline-block"}}>
                    <MapCanvas />
                    <DownloadLink />
                </div>
            </div>
            <hr />
            <ItemList />
        </DndContext>
    );
};