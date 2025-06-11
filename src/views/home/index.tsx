import { useEffect, useState } from "react"

import { toast } from "sonner"
import { endOfMonth, startOfMonth } from "date-fns"

import { AppSidebar } from "@/components/app-sidebar"
import ContentLayout from "@/components/content-layout"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Mode } from "@/components/calendar/calendar-types"
import CalendarProvider from "@/components/calendar/calendar-provider"
import CalendarHeader from "@/components/calendar/header/calendar-header"
import CalendarHeaderDate from "@/components/calendar/header/date/calendar-header-date"
import CalendarHeaderActions from "@/components/calendar/header/actions/calendar-header-actions"
import CalendarHeaderActionsMode from "@/components/calendar/header/actions/calendar-header-actions-mode"
import CalendarHeaderActionsAdd from "@/components/calendar/header/actions/calendar-header-actions-add"
import CalendarBody from "@/components/calendar/body/calendar-body"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

import eventService from "@/api/events"
import calendarService from "@/api/calendars"

import { useQueryParams } from "@/hooks/use-query-params"
import useCrypto from "@/hooks/use-crypto"

import { Event } from "@/types/event"
import { Calendar } from "@/types/calendar"

const HomePage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [events, setEvents] = useState<Event[]>()
    const [calendars, setCalendars] = useState<Calendar[]>()

    const [mode, setMode_] = useState<Mode>('month')
    const [date, setDate_] = useState<Date>(new Date())

    const { getQueryParamByKey, setQueryParam } = useQueryParams()

    const modeParam = getQueryParamByKey('mode') as Mode
    const dateParam = getQueryParamByKey('date') ? new Date(getQueryParamByKey('date')) : new Date()

    const {
        decryptData,
    } = useCrypto()

    const setDate = (date: Date) => {
        setQueryParam('date', date.toISOString())
        setDate_(date)
    }

    const setMode = (mode: Mode) => {
        setQueryParam('mode', mode)
        setMode_(mode)
    }

    useEffect(() => {
        // Get the first day of the month
        const monthStart = startOfMonth(dateParam).toISOString()
        // Get the last day of the month
        const monthEnd = endOfMonth(dateParam).toISOString()

        Promise.all([eventService.getEvents(monthStart, monthEnd), calendarService.getCalendars()])
            .then(([eventsResponse, calendarsResponse]) => {
                setEvents(
                    eventsResponse.data.map((event) => ({
                        ...event,
                        title: decryptData(event.title)?.data as string,
                        color: decryptData(event.color)?.data as string,
                        calendarId: decryptData(event.calendarId ?? '')?.data as string,
                        start: decryptData(event.start)?.data as string,
                        end: decryptData(event.end)?.data as string,
                    }))
                )
                setCalendars(calendarsResponse.data.map((calendar) => ({
                    ...calendar,
                    name: decryptData(calendar.name)?.data as string,
                    items: calendar.items.map((item) => decryptData(item)?.data as string),
                })))
            })
            .catch((error) => toast(error.data))
            .finally(() => setLoading(false))

        if (modeParam && modeParam !== mode) setMode(modeParam)
        if (dateParam && dateParam !== date) setDate(dateParam)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!events || !calendars) return

        // Get the first day of the month
        const monthStart = startOfMonth(date).toISOString()
        // Get the last day of the month
        const monthEnd = endOfMonth(date).toISOString()

        eventService.getEvents(monthStart, monthEnd)
            .then((response) => setEvents(response.data))
            .catch((error) => toast(error.data.detail))

        // eslint-disable-next-line
    }, [getQueryParamByKey('mode'), getQueryParamByKey('date')])

    if (!events || !calendars) {
        return (
            <ContentLayout loading={loading} />
        )
    }

    return (
        <ContentLayout loading={loading}>
            <CalendarProvider
                events={events}
                setEvents={setEvents}
                calendars={calendars}
                setCalendars={setCalendars}
                mode={mode}
                setMode={setMode}
                date={date}
                setDate={setDate}
                calendarIconIsToday={false}
            >
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-20">
                            <SidebarTrigger className="block md:hidden lg:hidden -ml-1" />
                            <Separator orientation="vertical" className="block md:hidden lg:hidden mr-2 h-4" />
                            <div className="flex justify-between items-center w-full">
                                <Button
                                    onClick={() => setDate(new Date())}
                                >
                                    Aujourd'hui
                                </Button>
                                <ModeToggle />
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            <CalendarHeader>
                                <CalendarHeaderDate />
                                <CalendarHeaderActions>
                                    <CalendarHeaderActionsMode />
                                    <CalendarHeaderActionsAdd />
                                </CalendarHeaderActions>
                            </CalendarHeader>
                            <CalendarBody />
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </CalendarProvider>
        </ContentLayout>
    )
}

export default HomePage