export default class World {
    private tickCallbackArray = [];
    private running = false;
    private interval = 1000;
    private height = 10;
    private width = 10;

    constructor() {
        console.log('Create world');

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

    public getState(): Array<Array<String>> {
        const state = [];
        for (let x = 0; x < this.width; x++) {
            state[x] = [];
            for (let y = 0; y < this.height; y++) {
                state[x][y] = Math.random() > 0.5 ? 'empty' : 'carrot';
            }
        }
        return state;
    }

    private tick(): void {
        this.tickCallbackArray.forEach(t => t());

        console.log('tick');

        if (this.running) {
            setTimeout(this.tick, this.interval);
        }
    }
}
