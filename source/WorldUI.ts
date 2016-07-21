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

    private renderUI(): void {
        this.parentElm.classList.add('ui');
        this.worldElm = document.createElement('div');
        this.worldElm.classList.add('world');
        this.parentElm.appendChild(this.worldElm);
    }

    private renderWorld(): void {
        const lines = ['test', 'another test'];
        this.worldElm.innerText = lines.join('\n');
    }
}
