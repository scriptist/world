import randomInt from './randomInt';

import Carrot from './entities/Carrot';
import Rabbit from './entities/Rabbit';
import Wolf from './entities/Wolf';

export default class World {
    public carrotGrowthChance = 0.01;
    public carrotHealthValue = 5;
    public rabbitHealthValue = 8;
    public height = 40;
    public width = 40;

    private tickCallbackArray: Array<Function>;
    private entities: Array<Carrot | Rabbit | Wolf>;
    private running = false;
    private interval = 16;

    constructor() {
        this.tickCallbackArray = [];
        this.entities = [];

        this.tick = this.tick.bind(this);
    }

    public everyTick(f: Function): boolean {
        if (typeof f !== 'function') {
            return false;
        }

        this.tickCallbackArray.push(f);
        return true;
    };

    public restart(): boolean {
        this.entities = [];
        const area = this.height * this.width;
        const rabbits = area * 0.05;
        const wolves = area * 0.01;

        for (let i = 0; i < rabbits; i++) {
            this.addEntity(new Rabbit(randomInt(0, this.width - 1), randomInt(0, this.height - 1), this));
        }

        for (let i = 0; i < wolves; i++) {
            this.addEntity(new Wolf(randomInt(0, this.width - 1), randomInt(0, this.height - 1), this));
        }

        return this.start();
    }

    public start(): boolean {
        if (this.running) {
            return false;
        }

        this.running = true;
        this.tick();
        return true;
    }

    public stop(): boolean {
        if (!this.running) {
            return false;
        }

        return this.running = false;
    }

    public addEntity(e: Carrot | Rabbit | Wolf): void {
        this.entities.push(e);
    }

    public getClosest(Type: Function, x: number, y: number): Carrot | Rabbit | Wolf {
        return this.entities.reduce((p, e) => {
            if (!(e instanceof Type)) {
                return p;
            }
            if (!p || this.getDistance(x, y, e.x, e.y) < this.getDistance(x, y, p.x, p.y)) {
                return e;
            }
            return p;
        }, null);
    }

    public getDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    public getEntitiesAt(x: number, y: number): Array<Carrot | Rabbit | Wolf> {
        const entities: Array<Carrot | Rabbit | Wolf> = [];
        for (let i = 0; i < this.entities.length; i++) {
            const e = this.entities[i];
            if (e.x === x && e.y === y) {
                entities.push(e);
            }
        }

        return entities;
    }

    public getState(): Array<Array<Array<Carrot | Rabbit | Wolf>>> {
        const state = [];
        for (let x = 0; x < this.width; x++) {
            state[x] = [];
            for (let y = 0; y < this.height; y++) {
                state[x][y] = [];
            }
        }

        this.entities.forEach(e => {
            state[e.x][e.y].push(e);
        });

        return state;
    }

    public removeEntity(entity) {
        this.entities = this.entities.filter(e => e !== entity);
    }

    private tick(): void {
        // Run the `tick` function for all entities
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].tick();
        }

        // Grow random carrots in empty squares
        let state = this.getState();
        for (let x = 0; x < state.length; x++) {
            for (let y = 0; y < state[x].length; y++) {
                if (state[x][y].length === 0 && Math.random() < this.carrotGrowthChance) {
                    this.entities.push(new Carrot(x, y, this));
                }
            }
        }

        // Tick is complete, fire callbacks
        state = this.getState();
        this.tickCallbackArray.forEach(t => t(state));

        console.log({
            Carrots: this.entities.filter(e => e instanceof Carrot).length,
            Rabbits: this.entities.filter(e => e instanceof Rabbit).length,
            Wolves: this.entities.filter(e => e instanceof Wolf).length,
        });

        if (this.running) {
            setTimeout(this.tick, this.interval);
        }
    }
}
