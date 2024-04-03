import React, {
  useState,
  useEffect,
  Component,
  JSXElementConstructor,
  ReactElement,
  useRef,
} from "react";
import { Slot, Sphere, Box } from "../../../unit/package/Primitive/main";
import { runMatterPhysics } from "./physics";
import Matter, { Body, use } from "matter-js";
import { set } from "yaml/dist/schema/yaml-1.1/set";
import { Canvas, RectTransform } from "../../../unit/package/PrimitiveUix/main";
import { StyledText, StyledImage } from "../../../unit/package/StyledUix/main";
import { UnitProp } from "../../../../lib/mirage-x/unit/common";
import { MatterPhysics, radiansToQuaternionZ } from "./physicss";

const WORLD_SCALE = 0.01;

export const Main = () => {
  const [, _setTime] = useState(performance.now());
  const matterRef = useRef(new MatterPhysics());
  const timeRef = useRef(performance.now());

  const update = () => {
    _setTime(performance.now());
  };

  useEffect(() => {
    setInterval(() => {
      matterRef.current.update(performance.now() - timeRef.current);
      timeRef.current = performance.now();
      update();
    }, 1000 / 30);

    matterRef.current.addBox(1, 0, 10, 0.2, true);
    matterRef.current.addBox(1, 10, 0.5, 0.5, false);
    matterRef.current.addBox(1, 10, 0.5, 0.5, false);
    matterRef.current.addBox(1, 10, 0.5, 0.5, false);
    matterRef.current.addBox(1, 10, 0.5, 0.5, false);
    matterRef.current.addBox(1, 10, 0.5, 0.5, false);
    matterRef.current.addBox(1, 10, 0.5, 0.5, false);
    matterRef.current.addBox(1, 10, 0.5, 0.5, false);
    matterRef.current.addSphere(1.5, 2, 0.5, false);

    console.log(matterRef.current.engine.world);
  }, []);
  console.log(matterRef.current.engine.world.bodies[1]?.angle);
  return (
    <Slot>
      {matterRef.current.matterObjects.map((object) => {
        const finded = matterRef.current.engine.world.bodies.find(
          (composite) => composite.id === object.bodyId
        );
        if (finded) {
          switch (object.shape.type) {
            case "box":
              return (
                <Box
                  position={[
                    finded.position.x * WORLD_SCALE,
                    -finded.position.y * WORLD_SCALE,
                    0,
                  ]}
                  rotation={radiansToQuaternionZ(finded.angle)}
                  size={[object.shape.width, object.shape.height, 1]}
                />
              );
            case "circle":
              return (
                <Sphere
                  position={[
                    finded.position.x * WORLD_SCALE,
                    -finded.position.y * WORLD_SCALE,
                    0,
                  ]}
                  radius={object.shape.radius}
                />
              );
          }
        }
      })}
    </Slot>
  );
};

export default Main;
