import { useState } from "react";
import { useItemContext } from "../context/ItemContext";
import { Alert, Form, InputGroup } from "react-bootstrap";

/** ファイル画像アップローダコンポーネント */
export const FileImageUploader = () =>
{
    const { addItem: addImage } = useItemContext();

    // エラーメッセージ
    const [errorText, setErrorText] = useState<string>("");

    // 画像ファイルロード
    const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setErrorText("");

        const files = e.target.files

        if (!files) return;

        for (var i = 0; i < files.length; i++)
        {
            const file = files[i];
            if (!file.type.startsWith('image/'))
            {
                continue;
            }

            const imageUrl = URL.createObjectURL(file);

            const img = new Image();
            // ロード成功時
            img.onload = () =>
            {
                addImage(imageUrl, img.naturalWidth, img.naturalHeight);
            };
            
            // ロード失敗時
            img.onerror = () =>
            {
                setErrorText(errorText + '画像の読み込みに失敗しました:' + imageUrl + "\n");
                URL.revokeObjectURL(imageUrl); // リソース解放
            };

            img.src = imageUrl;
        }
    };

    return (
        <>
            <InputGroup>
                <InputGroup.Text>ローカル:</InputGroup.Text>
                <Form.Control
                    type="file"
                    accept='image/*'
                    onChange={ handleLoadFile }
                    multiple
                />
            </InputGroup>
            { errorText.length > 0 && (
                <Alert variant="danger">
                    { errorText }
                </Alert>
            ) }

        </>
    );
}