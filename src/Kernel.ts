import { Container } from "@hexaform/container";

export class Kernel {
    protected container: Container;

    constructor(container: Container) {
        this.container = container;
    }
}