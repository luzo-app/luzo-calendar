import api from ".";

import { Event } from "@/types/event";

import { PaginatedResponse } from "@/types/api";

const eventService = {
  getEvents: async (start?: string, end?: string): Promise<PaginatedResponse<Event>> => {
    const response = await api.get<PaginatedResponse<Event>>("/events", { params: { start_gte: start, end_lte: end } })
    return response.data
  },
  deleteEvent: async (id: Event["_id"]): Promise<void> => {
    await api.delete(`/events/${id}`)
  },
  createEvent: async (data: Omit<Event, "_id">): Promise<Event> => {
    const response = await api.post<Event>("/events", data)
    return response.data
  },
  updateEvent: async (id: Event["_id"], data: Event): Promise<Event> => {
    const response = await api.put<Event>(`/events/${id}`, data)
    return response.data
  },
};

export default eventService;
