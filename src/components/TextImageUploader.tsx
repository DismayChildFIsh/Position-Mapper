import { useRef } from "react";
import { useMapContext } from "../context/MapContext";
import { useItemContext } from "../context/ItemContext";
import { drawText, getTextMatrix } from "../utils/CanvasDrawer";
import { Button, Form, InputGroup } from "react-bootstrap";

/** テキスト画像アップローダコンポーネント */
export const TextImageUploader = () =>
{
    const { fontInfo } = useMapContext();

    const { addItem: addImage } = useItemContext();

    const textInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    /** テキスト画像追加 */
    const handleAddTextItem = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        const textInput = textInputRef.current;
        if (!textInput) return;

        const text = textInput.value;

        if (text.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 描画時の文字列のサイズを取得
        const matrix = getTextMatrix(ctx, fontInfo, text);

        canvas.width = matrix.width + 10;
        canvas.height = matrix.actualBoundingBoxAscent + matrix.actualBoundingBoxDescent + 10;

        // 文字列を描画
        drawText(ctx, fontInfo, text);

        // URLを取得し、表示アイテムとして追加
        const dataURL = canvas.toDataURL('image/png');
        addImage(dataURL, canvas.width, canvas.height);

        textInput.value = "";
    };

    return (
        <InputGroup>
            <InputGroup.Text>文字列:</InputGroup.Text>
            <Form.Control ref={ textInputRef } maxLength={20}/>
            <Button
                onClick={ handleAddTextItem }
            >
                追加
            </Button>
            
            <canvas ref={ canvasRef } style={ { display: "none" } }></canvas>
        </InputGroup>
    );
}