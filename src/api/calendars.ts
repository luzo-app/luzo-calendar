import api from ".";

import { Calendar } from "@/types/calendar";

const calendarService = {
  getCalendars: async () => await api.get("/calendars"),
  deleteCalendar: async (id: number) => await api.delete(`/calendars/${id}`),
  createCalendar: async (data: Omit<Calendar, "id">) => await api.post("/calendars", data),
  updateCalendar: async (id: number, data: Calendar) => await api.put(`/calendars/${id}`, data),
};

export default calendarService;