import api from ".";

import { Event } from "@/types/event";

const eventService = {
  getEvents: async (start?: string, end?: string) =>
    await api.get("/events", { params: { start_gte: start, end_lte: end } }),
  deleteEvent: async (id: Event["id"]) => await api.delete(`/events/${id}`),
  createEvent: async (data: Omit<Event, "id">) =>
    await api.post("/events", data),
  updateEvent: async (id: Event["id"], data: Event) =>
    await api.put(`/events/${id}`, data),
};

export default eventService;
