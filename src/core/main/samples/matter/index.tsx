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
import {
  StyledText,
  StyledImage,
  StyledButton,
} from "../../../unit/package/StyledUix/main";
import { UnitProp } from "../../../../lib/mirage-x/unit/common";
import { MatterPhysics, radiansToQuaternionZ } from "./physicss";

const WORLD_SCALE = 0.01;

const BoxRenderer = (props: {
  position: [number, number, number];
  rotation: [number, number, number, number];
  size: [number, number, number];
}) => {
  return (
    <Box
      position={props.position}
      rotation={props.rotation}
      size={props.size}
    />
  );
};

export const Main = () => {
  const [, _setTime] = useState(performance.now());
  const matterRef = useRef(new MatterPhysics());
  const timeRef = useRef(performance.now());

  const update = () => {
    _setTime(performance.now());
  };

  useEffect(() => {
    setInterval(() => {
      matterRef.current.update(1000 / 30);
      timeRef.current = performance.now();
      update();
    }, 1000 / 30);

    matterRef.current.addBox(1, 0, 10, 0.2, true);

    matterRef.current.addBox(5, 10, 0.5, 4, false, Math.PI / 4);

    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      0.8,
      0.1,
      false,
      Math.PI / 4
    );
    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      0.5,
      0.1,
      false,
      Math.PI / 4
    );
    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      0.5,
      0.1,
      false,
      Math.PI / 4
    );
    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      0.5,
      0.1,
      false,
      Math.PI / 4
    );
    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      0.5,
      0.1,
      false,
      Math.PI / 4
    );
    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      0.5,
      0.1,
      false,
      Math.PI / 4
    );
    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      1,
      1,
      false,
      Math.PI / 4
    );
    matterRef.current.addBox(
      Math.random() * 3,
      Math.random() * 3,
      0.5,
      0.5,
      false,
      Math.PI / 4
    );

    matterRef.current.addSphere(Math.random() * 3, Math.random() * 3, 1, false);
    matterRef.current.addSphere(
      Math.random() * 3,
      Math.random() * 3,
      0.2,
      false
    );
    matterRef.current.addSphere(
      Math.random() * 3,
      Math.random() * 3,
      0.2,
      false
    );
    matterRef.current.addSphere(
      Math.random() * 3,
      Math.random() * 3,
      0.2,
      false
    );
    matterRef.current.addSphere(Math.random() * 3, Math.random() * 3, 1, false);

    console.log(matterRef.current.engine.world);
  }, []);
  //console.log(matterRef.current.matterObjects);
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
                <BoxRenderer
                  key={finded.id}
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
                  key={finded.id}
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
      <Canvas position={[0, -1, 0]} size={[500, 200]}>
        <StyledButton
          onClick={() => {
            matterRef.current.engine.world.bodies.forEach((body) => {
              Matter.Body.applyForce(
                body,
                { x: body.position.x, y: body.position.y },
                { x: 0, y: -0.1 } //{ x: (Math.random() - 0.5) *0.01, y: (Math.random() - 0.5) *0.01 }
              );
            });
          }}
        >
          <StyledText content="Add Force to all objects" />
        </StyledButton>
      </Canvas>
    </Slot>
  );
};

export default Main;
