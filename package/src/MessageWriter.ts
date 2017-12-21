import { Helper } from "./Helper"

export class MessageWriter {
    private readonly helper: Helper;

    constructor(private readonly message: string) {
        this.helper = new Helper();
    }

    writeMessage() {
        this.helper.write(this.message, 3);
    }
}