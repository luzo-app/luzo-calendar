import { CalendarContext } from './calendar-context'
import { Mode } from './calendar-types'
import { useState } from 'react'
import CalendarNewEventDialog from './dialog/calendar-new-event-dialog'
import CalendarManageEventDialog from './dialog/calendar-manage-event-dialog'
import CalendarNewDialog from './dialog/calendar-new-dialog'
import CalendarManageCalendarDialog from './dialog/calendar-manage-calendar-dialog'

import { Event as CalendarEvent } from '@/types/event'
import { Calendar } from '@/types/calendar'

export default function CalendarProvider({
  events,
  setEvents,
  calendars,
  setCalendars,
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
  children,
}: {
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  calendars: Calendar[]
  setCalendars: (calendars: Calendar[]) => void
  mode: Mode
  setMode: (mode: Mode) => void
  date: Date
  setDate: (date: Date) => void
  calendarIconIsToday: boolean
  children: React.ReactNode
}) {
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false)
  const [newCalendarDialogOpen, setNewCalendarDialogOpen] = useState(false)
  const [manageEventDialogOpen, setManageEventDialogOpen] = useState(false)
  const [manageCalendarDialogOpen, setManageCalendarDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(null)
  const [calendarDayClicked, setCalendarDayClicked] = useState<Date | null>(null)

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        calendars,
        setCalendars,
        mode,
        setMode,
        date,
        setDate,
        calendarIconIsToday,
        newEventDialogOpen,
        setNewEventDialogOpen,
        newCalendarDialogOpen,
        setNewCalendarDialogOpen,
        manageEventDialogOpen,
        setManageEventDialogOpen,
        manageCalendarDialogOpen,
        setManageCalendarDialogOpen,
        selectedEvent,
        setSelectedEvent,
        selectedCalendar,
        setSelectedCalendar,
        calendarDayClicked,
        setCalendarDayClicked,
      }}
    >
      <CalendarNewEventDialog />
      <CalendarManageEventDialog />
      <CalendarNewDialog />
      <CalendarManageCalendarDialog />
      {children}
    </CalendarContext.Provider>
  )
}
