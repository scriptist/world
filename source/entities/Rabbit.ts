import World from '../World';

export default class Rabbit {
    public x: number;
    public y: number;
    public world: World;
    public alive = true;

    constructor(x: number, y: number, world: World) {
        this.x = x;
        this.y = y;
        this.world = world;
    }

    public tick(): void {
        return;
    }

    public kill(): void {
        this.alive = false;
        this.world.removeEntity(this);
    }
}
