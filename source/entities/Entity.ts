import World from '../World';
import shuffleArray from '../shuffleArray';

interface IDelta {
    x: number;
    y: number;
}

export default class Entity {
    public x: number;
    public y: number;
    public health: number;
    public world: World;
    public alive = true;

    constructor(x: number, y: number, world: World) {
        this.x = x;
        this.y = y;
        this.world = world;

        this.health = 10;
    }

    public checkHealth(): void {
        if (--this.health < 0) {
            this.kill();
        } else if (this.health > 20) {
            // TODO: Reproduce
            this.health = Math.floor(this.health / 2);
        }
    }

    public kill(): void {
        this.alive = false;
        this.world.removeEntity(this);
    }

    public moveTowards(x: number, y: number): boolean {
        const deltas = [];

        if (this.x < x) {
            deltas.push({x: 1, y: 0});
        } else if (this.x > x) {
            deltas.push({x: -1, y: 0});
        }

        if (this.y < y) {
            deltas.push({x: 0, y: 1});
        } else if (this.y > y) {
            deltas.push({x: 0, y: -1});
        }

        return this.movePriority(shuffleArray(deltas));
    }

    public moveRandom(): boolean {
        const deltas = shuffleArray([
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
            {x: 0, y: -1},
        ]);

        return this.movePriority(deltas);
    }

    private checkBounds(x: number, y: number): boolean {
        return !(x < 0 || y < 0 || x >= this.world.width || y >= this.world.height);
    }

    private movePriority(deltas: Array<IDelta>): boolean {
        for (let i = 0; i < deltas.length; i++) {
            const delta = deltas[i];
            if (this.checkBounds(this.x + delta.x, this.y + delta.y)) {
                this.x += delta.x;
                this.y += delta.y;
                return true;
            }
        }

        return false;
    }
}
