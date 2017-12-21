import { setInterval } from "timers";

export class Helper {
    private timer: NodeJS.Timer;

    private remaining_times: number;
    private message: string;

    constructor() {
        this.timer = setInterval(this.tick, 500);
    }

    tick() {
        console.log("tick");
        if(this.message && this.remaining_times > 0) {
            console.log(this.message);
            this.remaining_times -= 1;
        }
    }

    write(message: string, times: number) {
        this.message = message;
        this.remaining_times = times;
    }
}