declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

import World from './World';
import WorldUI from './WorldUI';
require('./styles/app.scss');

const elm = document.createElement('div');
document.body.appendChild(elm);

const world = new World();
new WorldUI(elm, world);
