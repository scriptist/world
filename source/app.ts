import World from './World';
import WorldUI from './WorldUI';

const elm = document.createElement('div');
document.body.appendChild(elm);

const world = new World();
new WorldUI(elm, world);
