import Carrot from './Carrot';
import Entity from './Entity';

export default class Rabbit extends Entity {
    public tick(): void {
        const closestCarrot = this.world.getClosest(Carrot, this.x, this.y);
        if (closestCarrot) {
            this.moveTowards(closestCarrot.x, closestCarrot.y);
        } else {
            this.moveRandom();
        }

        const sharedEntities = this.world.getEntitiesAt(this.x, this.y);
        sharedEntities.forEach(e => {
            if (e instanceof Carrot) {
                e.kill();
                this.health += this.world.carrotHealthValue;
            }
        });

        this.checkHealth();
        console.log(this);

        return;
    }
}
