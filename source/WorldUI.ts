import World from './World';
import Carrot from './entities/Carrot';
import Rabbit from './entities/Rabbit';
import Wolf from './entities/Wolf';

export default class UI {
    private parentElm: HTMLElement;
    private worldElm: HTMLElement;
    private world: World;

    constructor(elm: HTMLElement, world: World) {
        this.parentElm = elm;
        this.world = world;

        this.renderUI();

        this.world.everyTick(this.renderWorld.bind(this));

        this.world.start();
    }

    private getSymbol(e: Carrot | Rabbit | Wolf): string {
        if (e === null) {
            return ' ';
        } else if (e instanceof Carrot) {
            return 'C';
        } else if (e instanceof Rabbit) {
            return 'R';
        } else if (e instanceof Wolf) {
            return 'W';
        }

        return '?';
    }

    private renderUI(): void {
        this.parentElm.classList.add('ui');
        this.worldElm = document.createElement('div');
        this.worldElm.classList.add('world');
        this.parentElm.appendChild(this.worldElm);
    }

    private renderWorld(state): void {
        const lines = [];

        for (let y = 0; state.length && y < state[0].length; y++) {
            lines[y] = '';

            for (let x = 0; x < state.length; x++) {
                lines[y] += this.getSymbol(state[x][y]);
            }
        }

        this.worldElm.innerText = lines.join('\n');
    }
}
