import World from '../World';
import Entity from './Entity';
import Rabbit from './Rabbit';

export default class Wolf extends Entity {
    constructor(x: number, y: number, world: World) {
        super(x, y, world);

        this.baseHealth = this.health = 40;
    }

    public duplicate(): Wolf {
        return new Wolf(this.x, this.y, this.world);
    }

    public tick(): void {
        const closestRabbit = this.world.getClosest(Rabbit, this.x, this.y);
        if (closestRabbit) {
            this.moveTowards(closestRabbit.x, closestRabbit.y);
        } else {
            this.moveRandom();
        }

        const sharedEntities = this.world.getEntitiesAt(this.x, this.y);
        sharedEntities.forEach(e => {
            if (e instanceof Rabbit) {
                e.kill();
                this.health += this.world.rabbitHealthValue;
            }
        });

        this.checkHealth();

        return;
    }
}
