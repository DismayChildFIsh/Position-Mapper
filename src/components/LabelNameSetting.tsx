import { ChangeEvent } from "react";
import { useMapContext } from "../context/MapContext";
import { Form, InputGroup } from "react-bootstrap";
import { MapSettingContainer } from "./MapSettingContainer";

/** ラベル名設定コンポーネント */
export const LabelNameSetting = () =>
{
  const { axisNames, setAxisNames } = useMapContext();

  /** ラベル名変更 */
  const handleAxisNameChange = (event: ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value } = event.target;
    setAxisNames((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <MapSettingContainer>
      <legend>ラベル</legend>
      <InputGroup>
        <InputGroup.Text>上:</InputGroup.Text>
        <Form.Control
          name='yAxisHigh'
          value={ axisNames.yAxisHigh }
          onChange={ handleAxisNameChange }
        />
        <InputGroup.Text>下:</InputGroup.Text>
        <Form.Control
          name='yAxisLow'
          value={ axisNames.yAxisLow }
          onChange={ handleAxisNameChange }
        />
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>左:</InputGroup.Text>
        <Form.Control
          name='xAxisLow'
          value={ axisNames.xAxisLow }
          onChange={ handleAxisNameChange }
        />        
        <InputGroup.Text>右:</InputGroup.Text>
        <Form.Control
          name='xAxisHigh'
          value={ axisNames.xAxisHigh }
          onChange={ handleAxisNameChange }
        />      
      </InputGroup>
    </MapSettingContainer>
  );
}