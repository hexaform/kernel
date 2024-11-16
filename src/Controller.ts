import { CommandBus } from "@hexaform/cqrs";
import { QueryBus } from "@hexaform/cqrs";

export class Controller {
    protected readonly commandBus: CommandBus;
    protected readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    [key: string | symbol]: any
}