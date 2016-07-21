export default class World {
    private tickCallbackArray = [];
    private running = false;
    private interval = 1000;

    constructor() {
        console.log('Create world');

        this.tick = this.tick.bind(this);
    }

    public everyTick(f: Function): void {
        this.tickCallbackArray.push(f);
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

    private tick(): void {
        this.tickCallbackArray.forEach(t => t());

        console.log('tick');

        if (this.running) {
            setTimeout(this.tick, this.interval);
        }
    }
}
