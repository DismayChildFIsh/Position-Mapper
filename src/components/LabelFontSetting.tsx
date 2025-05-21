import { Col, Form, Row } from "react-bootstrap";
import { FONT_SIZE_MAX, FONT_SIZE_MIN } from "../constants/constants";
import { useMapContext } from "../context/MapContext";
import { getCommonFonts } from "../utils/FontUtils";
import { MapSettingContainer } from "./MapSettingContainer";

/** ラベルフォント設定コンポーネント */
export const LabelFontSetting = () =>
{
    const { 
        fontInfo: { name, size }, 
        setFontInfo 
    } = useMapContext();

    /** フォントサイズ変更 */
    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const newFontInfo = {
            name,
            size: parseInt(event.target.value)
        };
        setFontInfo(newFontInfo);
    };

    /** フォント変更 */
    const handleFontNameChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    {
        const newFontInfo = {
            name: event.target.value,
            size
        };
        setFontInfo(newFontInfo);
    };

    return (
        <MapSettingContainer>
            <legend>ラベル</legend>
            <Row>
                <Col xs='auto'>
                    <Form.Label>サイズ:</Form.Label>
                </Col>
                <Col>
                    <Form.Range
                        min={ FONT_SIZE_MIN }
                        max={ FONT_SIZE_MAX }
                        value={ size }
                        onChange={ handleFontSizeChange }
                    />
                </Col>
                <Col xs='auto'>
                    <span>{ size }px</span>
                </Col>
            </Row>
            <Row>
                <Col xs='auto'>
                    <Form.Label>フォント:</Form.Label>
                </Col>
                <Col>
                    <Form.Select value={ name } onChange={              handleFontNameChange }>
                        { getCommonFonts().map((value, index) =>
                            <option
                                key={ index }
                                value={ value }
                                style={ { fontFamily: value } }
                            >
                                { value }
                            </option>
                        ) }
                    </Form.Select>
                </Col>
            </Row>
        </MapSettingContainer>
    );
};