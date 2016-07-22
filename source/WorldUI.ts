import World from './World';
import Carrot from './entities/Carrot';
import Rabbit from './entities/Rabbit';
import Wolf from './entities/Wolf';

export default class UI {
    private parentElm: HTMLElement;
    private worldElms: Array<Array<HTMLElement>>;
    private world: World;

    private height = 100;
    private width = 100;

    constructor(elm: HTMLElement, world: World) {
        this.parentElm = elm;
        this.world = world;

        world.height = this.height;
        world.width = this.width;

        this.renderUI();

        this.world.everyTick(this.renderWorld.bind(this));

        this.world.restart();
    }

    private getClass(entities: Array<Carrot | Rabbit | Wolf>): string {
        let className = 'entity';

        for (let i = 0; i < entities.length; i++) {
            const e = entities[i];

            if (e instanceof Carrot) {
                className += ' entity--carrot';
            } else if (e instanceof Rabbit) {
                className += ' entity--rabbit';
            } else if (e instanceof Wolf) {
                className += ' entity--wolf';
            } else {
                className += ' entity--unknown';
            }
        }

        return className;
    }

    private renderUI(): void {
        this.parentElm.classList.add('ui');

        const worldElm = document.createElement('div');
        worldElm.classList.add('world');

        this.worldElms = [];

        for (let y = 0; y < this.height; y++) {
            const rowElm = document.createElement('div');
            rowElm.classList.add('row');
            for (let x = 0; x < this.height; x++) {
                const elm = document.createElement('span');
                elm.classList.add('entity');

                this.worldElms[x] = this.worldElms[x] || [];
                this.worldElms[x][y] = elm;

                rowElm.appendChild(elm);
            }

            worldElm.appendChild(rowElm);
        }

        this.parentElm.appendChild(worldElm);
    }

    private renderWorld(state): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.worldElms[x][y].className = this.getClass(state[x][y]);
            }
        }

        // this.worldElm.innerHTML = '';
        //
        // for (let y = 0; state.length && y < state[0].length; y++) {
        //     const rowElm = document.createElement('div');
        //     rowElm.classList.add('row');
        //     this.worldElm.appendChild(rowElm);
        //
        //     for (let x = 0; x < state.length; x++) {
        //         rowElm.appendChild(this.getElm(state[x][y]));
        //     }
        // }
    }
}
