import {
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/mirage-x/unit/common";

const detail = {
  code: "Primitive/Box",
  propsConfig: {
    position: UnitProp.Float3([0, 0, 0]),
    rotation: UnitProp.FloatQ([0, 0, 0, 0]),
    size: UnitProp.Float3([1, 1, 1]),
  },
  children: "multi" as const,
};

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
