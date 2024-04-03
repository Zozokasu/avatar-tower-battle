import Matter, { Body } from "matter-js";

export const runMatterPhysics = () => {
  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  // create an engine
  var engine = Engine.create();

  // create two boxes and a ground
  // var boxA = Bodies.rectangle(200, -500, 80, 80);
  // var boxB = Bodies.rectangle(450, -100, 80, 80);

  // add all of the bodies to the world
  // Composite.add(engine.world, boxA);
  // Composite.add(engine.world, boxB);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  return engine;
};
