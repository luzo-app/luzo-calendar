import { Calendar } from "./calendar";

type Event = {
    _id: string;
    title: string;
    color: string;
    calendarId?: Calendar['_id'];
    start: string;
    end: string;
}

export type { Event }