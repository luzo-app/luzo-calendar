import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

import { fr } from 'date-fns/locale'
import { format } from "date-fns"
import { toast } from "sonner"

import { AppSidebar } from "@/components/app-sidebar"
import ContentLayout from "@/components/content-layout"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
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

import eventService from "@/api/event"

import { capitalizeFirstLetter } from "@/lib/utils"

import { Event } from "@/types/event"

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const [mode, setMode] = useState<Mode>('month')
    const [date, setDate] = useState<Date>(new Date())

    const location = useLocation();
    const navigate = useNavigate();

    const getEvents = async (): Promise<void> => {
        setLoading(true)
        await eventService.getEvents()
            .then((response) => {
                setEvents(response.data as Event[])
            })
            .catch((error) => {
                toast(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const deleteEvent = async (id: number): Promise<void> => {
        setLoading(true)
        await eventService.deleteEvent(id)
            .catch((error) => {
                toast(error.message)
            })
    }

    useEffect(() => {
        getEvents()
    }, [])

    useEffect(() => {
        if (location.state?.eventToDelete) {
            deleteEvent(location.state.eventToDelete.id)
                .finally(() => {
                    navigate(location.pathname, { replace: true });
                })
        }
    }, [location.state])

    if (!events) {
        return (
            <ContentLayout loading={loading}></ContentLayout>
        )
    }

    return (
        <ContentLayout loading={loading}>
            <CalendarProvider
                events={events}
                setEvents={setEvents}
                mode={mode}
                setMode={setMode}
                date={date}
                setDate={setDate}
                calendarIconIsToday={false}
            >
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-10">
                            <SidebarTrigger className="block lg:hidden -ml-1" />
                            <Separator orientation="vertical" className="block lg:hidden mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {capitalizeFirstLetter(format(date, 'LLLL', { locale: fr }))} {format(date, 'yyyy', { locale: fr })}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
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