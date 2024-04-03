import React, {
  useState,
  useEffect,
  Component,
  JSXElementConstructor,
  ReactElement,
} from "react";
import { Slot, Sphere, Box } from "../../../unit/package/Primitive/main";
import { runMatterPhysics } from "./physics";
import Matter, { Body, use } from "matter-js";
import { set } from "yaml/dist/schema/yaml-1.1/set";
import { Canvas, RectTransform } from "../../../unit/package/PrimitiveUix/main";
import { StyledText, StyledImage } from "../../../unit/package/StyledUix/main";
import { UnitProp } from "../../../../lib/mirage-x/unit/common";

const worldScale = 0.01;
const engine = runMatterPhysics();
let worldObjects: [Body, ReactElement][] = [];

export const Main = () => {
  const [bodies, setBodies] = useState(engine.world.bodies);
  const [time, setTime] = useState(0);

  const updateInterval = 50;

  useEffect(() => {
    addObject(createBox(1, -2, 1, 1, false));
    addObject(createBox(4, 0, 8.1, 0.65, true));
    addObject(createCircle(3, -2, 0.5, false));
    addObject(createCircle(3.1, -3.1, 0.5, false));
  }, []);

  useEffect(() => {
    // コンポーネントがマウントされた後に定期的な更新を設定
    const interval = setInterval(() => {
      setBodies(engine.world.bodies);
      setTime((prevtime) => prevtime + updateInterval);

      console.log(bodies.length);
    }, updateInterval);

    // コンポーネントがアンマウントされた時にインターバルをクリア
    return () => clearInterval(interval);
  }, []); // 空の依存配列でマウント時のみ実行

  return (
    <Slot>
      {bodies.map((body, index) => {
        return (
          <Box
            key={index}
            position={[
              body.position.x * worldScale,
              -body.position.y * worldScale,
              0,
            ]}
            size={[
              (body.bounds.max.x - body.bounds.min.x) * worldScale,
              (body.bounds.max.y - body.bounds.min.y) * worldScale,
              1,
            ]}
          />
        );
      })}
      <Canvas size={[1100, 1500]}>
        <StyledImage>
          <StyledText
            content={time.toString()}
            verticalAlign="Middle"
            horizontalAlign="Center"
          />
        </StyledImage>
      </Canvas>
    </Slot>
  );
};

export default Main;

const createBox = (
  x: number,
  y: number,
  w: number,
  h: number,
  isStatic?: boolean
) => {
  //const [position, setPosition] = useState<[number, number, number]>([x, y, 0]);

  let box: [Body, ReactElement] = [
    Matter.Bodies.rectangle(
      x / worldScale,
      y / worldScale,
      w / worldScale,
      h / worldScale,
      { isStatic: isStatic }
    ),
    <Box position={[x, y, 0]} size={[w, h, 1]} />,
  ];

  // const updateTransform = () => {
  //   setPosition([
  //     box[0].position.x * worldScale,
  //     box[0].position.y * worldScale,
  //     0,
  //   ]);
  // };

  return box;
};

const createCircle = (x: number, y: number, r: number, isStatic?: boolean) => {
  let circle: [Body, ReactElement] = [
    Matter.Bodies.circle(x / worldScale, y / worldScale, r / worldScale, {
      isStatic: isStatic,
    }),
    <Sphere position={[x, y, 0]} radius={r} />,
  ];

  return circle;
};

const addObject = (object: [Body, ReactElement]) => {
  Matter.Composite.add(engine.world, object[0]);
  worldObjects.push(object);
};
