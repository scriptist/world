import World from './World';

export default class UI {
    private parentElm: HTMLElement;
    private worldElm: HTMLElement;
    private world: World;

    constructor(elm: HTMLElement, world: World) {
        this.parentElm = elm;
        this.world = world;

        this.renderUI();
        this.renderWorld();

        this.world.everyTick(this.renderWorld.bind(this));

        this.world.start();
    }

    private getSymbol(type: String) {
        switch (type) {
            case 'empty':
                return ' ';
            case 'carrot':
                return 'C';
            case 'rabbit':
                return 'R';
            case 'wolf':
                return 'W';
            default:
                return '?';
        }
    }

    private renderUI(): void {
        this.parentElm.classList.add('ui');
        this.worldElm = document.createElement('div');
        this.worldElm.classList.add('world');
        this.parentElm.appendChild(this.worldElm);
    }

    private renderWorld(): void {
        const state = this.world.getState();
        const lines = [];

        for (let y = 0; state.length && y < state[0].length; y++) {
            lines[y] = '';

            for (let x = 0; x < state.length; x++) {
                lines[y] += this.getSymbol(state[x][y]);
            }
        }

        console.log(lines);
        this.worldElm.innerText = lines.join('\n');
    }
}
