import World from '../World';
import Entity from './Entity';

export default class Carrot extends Entity {
    constructor(x: number, y: number, world: World) {
        super(x, y, world);

        this.health = Infinity;
    }

    public duplicate(): Carrot {
        return new Carrot(this.x, this.y, this.world);
    }

    public tick(): void {
        return;
    }
}
