import {
  cyan,
  generate,
  green,
  orange,
  presetPalettes,
  purple,
  red,
  yellow,
} from "@ant-design/colors";
import type { ColorPickerProps } from "antd";
import { Col, ColorPicker, Divider, Row, theme } from "antd";

type Presets = Required<ColorPickerProps>["presets"][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
  }));

export default function MyColorPicker(props: ColorPickerProps) {
  const { token } = theme.useToken();
  const presets = genPresets({
    red,
    yellow,
    primary: generate(token.colorPrimary),
    green,
    purple,
    cyan,
    orange,
  });

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } }
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col flex="auto">
        <Picker />
      </Col>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Col span={12}>
        <Presets />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      styles={{ popupOverlayInner: { width: 500 } }}
      panelRender={customPanelRender}
      presets={presets}
      {...props}
    />
  );
}
