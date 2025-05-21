import { FileImageUploader } from "./FileImageUploader";
import { HtmlImageUploader } from "./HtmlImageUploader";
import { MapSettingContainer } from "./MapSettingContainer";
import { TextImageUploader } from "./TextImageUploader";

/** 画像アップローダーコンポーネント */
export const ImageUploader = () =>
{
    return (
        <MapSettingContainer>
            <legend>画像を追加</legend>
            <FileImageUploader />
            <br />
            <TextImageUploader />
            <br />
            <HtmlImageUploader />
        </MapSettingContainer>
    );
};