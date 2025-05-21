import { useState } from "react";
import { useItemContext } from "../context/ItemContext";
import { ALL_ITEM_SIZE_CHANGE_DEFAULT, ALL_ITEM_SIZE_CHANGE_MAX, ALL_ITEM_SIZE_CHANGE_MIN } from "../constants/constants";
import { Col, Form, Row } from "react-bootstrap";
import { MapSettingContainer } from "./MapSettingContainer";

/**
 * 全ての表示アイテムのサイズを変更するコンポーネント
 */
export const AllItemSizeChanger = () =>
{
    const { changeAllItemSize } = useItemContext();

    // 表示アイテムサイズの現在値
    const [allImageSize, setAllImageSize] = useState<number>(ALL_ITEM_SIZE_CHANGE_DEFAULT);

    // サイズ変更ハンドラ
    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const ratio = parseInt(event.target.value);
        changeAllItemSize(ratio);
        setAllImageSize(ratio);
    };

    return (
        <MapSettingContainer>
            <legend>画像サイズ一括設定</legend>
            <Row>
                <Col>
                    <Form.Range
                        min={ALL_ITEM_SIZE_CHANGE_MIN}
                        max={ALL_ITEM_SIZE_CHANGE_MAX}
                        value={ allImageSize }
                        onChange={ handleSizeChange }
                    />
                </Col>
                <Col xs="auto">
                    <span>{ allImageSize }%</span>
                </Col>
            </Row>
        </MapSettingContainer>
    );
};