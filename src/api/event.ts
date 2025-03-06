import api from ".";

import { Event } from "@/types/event";

const eventService = {
  getEvents: async () => await api.get("/events"),
  deleteEvent: async (id: number) => await api.delete(`/events/${id}`),
  createEvent: async (data: Omit<Event, "id">) => await api.post("/events", data),
};

export default eventService;