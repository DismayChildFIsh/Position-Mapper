import { Col, Form, Row } from "react-bootstrap";
import { MAP_SIZE_MAX, MAP_SIZE_MIN } from "../constants/constants";
import { useItemContext } from "../context/ItemContext";
import { useMapContext } from "../context/MapContext";
import { MapSize } from "../hooks/useMapInfo";
import { MapSettingContainer } from "./MapSettingContainer";

/** マップサイズ設定コンポーネント */
export const MapSizeSetting = () =>
{
    const MAP_WIDTH_SIZE_ID = 'map-width-size';
    const MAP_HEIGHT_SIZE_ID = 'map-height-size';

    const {
        mapSize: { width, height },
        setMapSize,
    } = useMapContext();

    const { updateItemPosition: mapSizeChange } = useItemContext();

    /** マップサイズ変更 */
    const changeSize = (newMapSize: MapSize) =>
    {
        // 前回のサイズを保持
        const beforeMapSize: MapSize = { width, height };
        // 新しいサイズで状態を更新
        setMapSize(newMapSize);
        // 
        mapSizeChange(newMapSize, beforeMapSize);
    };

    // マップの幅を変更
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const width = parseInt(e.target.value);
        changeSize({ width, height });
    };

    // マップの高さを変更
    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const height = parseInt(e.target.value);
        changeSize({ width, height });
    };

    return (
        <MapSettingContainer>
            <legend>マップサイズ</legend>
            <Row>
                <Col xs="auto">
                    <Form.Label htmlFor={ MAP_WIDTH_SIZE_ID }>横:</Form.Label>
                </Col>
                <Col>
                    <Form.Range
                        id={ MAP_WIDTH_SIZE_ID }
                        min={ MAP_SIZE_MIN }
                        max={ MAP_SIZE_MAX }
                        value={ width }
                        onChange={ handleWidthChange }
                    />
                </Col>
                <Col xs="auto">
                    <span>{ width }px</span>
                </Col>
            </Row>
            <Row>
                <Col xs="auto">
                    <Form.Label htmlFor={ MAP_HEIGHT_SIZE_ID }>縦:</Form.Label>
                </Col>
                <Col>
                    <Form.Range
                        id={ MAP_HEIGHT_SIZE_ID }
                        min={ MAP_SIZE_MIN }
                        max={ MAP_SIZE_MAX }
                        value={ height }
                        onChange={ handleHeightChange }
                    />
                </Col>
                <Col xs="auto">
                    <span>{ height }px</span>
                </Col>
            </Row>
        </MapSettingContainer>
    );
};