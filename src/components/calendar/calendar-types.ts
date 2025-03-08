import { Calendar } from "@/types/calendar";
import { Event as CalendarEvent } from "@/types/event";

export type CalendarProps = {
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  calendars: Calendar[];
  setCalendars: (calendars: Calendar[]) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  date: Date;
  setDate: (date: Date) => void;
  calendarIconIsToday?: boolean;
};

export type CalendarContextType = CalendarProps & {
  newEventDialogOpen: boolean;
  setNewEventDialogOpen: (open: boolean) => void;
  manageEventDialogOpen: boolean;
  manageCalendarDialogOpen: boolean;
  setManageCalendarDialogOpen: (open: boolean) => void;
  newCalendarDialogOpen: boolean;
  setNewCalendarDialogOpen: (open: boolean) => void;
  setManageEventDialogOpen: (open: boolean) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  selectedCalendar: Calendar | null;
  setSelectedCalendar: (calendar: Calendar | null) => void;
  calendarDayClicked: Date | null;
  setCalendarDayClicked: (date: Date | null) => void;
};
export const calendarModes = ["day", "week", "month"] as const;
export type Mode = (typeof calendarModes)[number];
