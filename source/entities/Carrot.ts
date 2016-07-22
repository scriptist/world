import World from '../World';
import Entity from './Entity';

export default class Carrot extends Entity {
    constructor(x: number, y: number, world: World) {
        super(x, y, world);

        this.health = Infinity;
    }

    public tick(): void {
        return;
    }
}
