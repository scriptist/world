import randomInt from './randomInt';

import Carrot from './entities/Carrot';
import Rabbit from './entities/Rabbit';
import Wolf from './entities/Wolf';

export default class World {
    public carrotGrowthChance = 0.02;

    private tickCallbackArray: Array<Function>;
    private entities: Array<Carrot | Rabbit | Wolf>;
    private running = false;
    private interval = 1000;
    private height = 10;
    private width = 10;

    constructor() {
        this.tickCallbackArray = [];
        this.entities = [
            new Rabbit(randomInt(0, this.width), randomInt(0, this.height), this),
            new Wolf(randomInt(0, this.width), randomInt(0, this.height), this),
        ];

        this.tick = this.tick.bind(this);
    }

    public everyTick(f: Function): Boolean {
        if (typeof f !== 'function') {
            return false;
        }

        this.tickCallbackArray.push(f);
        return true;
    };

    public start(): Boolean {
        if (this.running) {
            return false;
        }

        this.running = true;
        this.tick();
        return true;
    }

    public stop(): Boolean {
        if (!this.running) {
            return false;
        }

        return this.running = false;
    }

    public getEntityAt(x: number, y: number): Carrot | Rabbit | Wolf {
        for (let i = 0; i < this.entities.length; i++) {
            const e = this.entities[i];
            if (e.x === x && e.y === y) {
                return e;
            }
        }

        return null;
    }

    public getState(): Array<Array<String>> {
        const state = [];
        for (let x = 0; x < this.width; x++) {
            state[x] = [];
            for (let y = 0; y < this.height; y++) {
                state[x][y] = null;
            }
        }

        this.entities.forEach(e => {
            state[e.x][e.y] = e;
        });

        return state;
    }

    public removeEntity(entity) {
        this.entities = this.entities.filter(e => e !== entity);
    }

    private tick(): void {
        let state = this.getState();
        // Run the `tick` function for all entities
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].tick();
        }

        // Grow random carrots in empty squares
        state = this.getState();
        for (let x = 0; x < state.length; x++) {
            for (let y = 0; y < state[x].length; y++) {
                if (state[x][y] === null && Math.random() < this.carrotGrowthChance) {
                    this.entities.push(new Carrot(x, y, this));
                }
            }
        }

        // Tick is complete, fire callbacks
        state = this.getState();
        this.tickCallbackArray.forEach(t => t(state));

        if (this.running) {
            setTimeout(this.tick, this.interval);
        }
    }
}
