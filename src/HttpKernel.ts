import { Kernel } from "./Kernel";

export abstract class HttpKernel extends Kernel {
    abstract listen(port: number): void;
}