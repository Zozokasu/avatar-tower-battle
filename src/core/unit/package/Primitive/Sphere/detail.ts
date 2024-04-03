import {
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/mirage-x/unit/common";

const detail = {
  code: "Primitive/Sphere",
  propsConfig: {
    position: UnitProp.Float3([0, 0, 0]),
    rotation: UnitProp.FloatQ([0, 0, 0, 0]),
    radius: UnitProp.Float(0.5),
  },
  children: "multi" as const,
};

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
