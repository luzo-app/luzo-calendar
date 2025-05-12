import { Calendar } from "./calendar";

type Event = {
    id: number;
    title: string;
    color: string;
    calendarId?: Calendar['id'];
    start: Date;
    end: Date;
}

export type { Event }