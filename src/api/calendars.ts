import api from ".";

import { Calendar } from "@/types/calendar";
import { PaginatedResponse } from "@/types/api";

const calendarService = {
  getCalendars: async (): Promise<PaginatedResponse<Calendar>> => {
    const response = await api.get<PaginatedResponse<Calendar>>("/calendars/")
    return response.data
  },
  deleteCalendar: async (id: Calendar["_id"]): Promise<void> => {
    await api.delete(`/calendars/${id}/`)
  },
  createCalendar: async (data: Omit<Calendar, "_id">): Promise<Calendar> => {
    const response = await api.post<Calendar>("/calendars/", data)
    return response.data
  },
  updateCalendar: async (id: Calendar["_id"], data: Calendar): Promise<Calendar> => {
    const response = await api.put<Calendar>(`/calendars/${id}/`, data)
    return response.data
  },
};

export default calendarService;