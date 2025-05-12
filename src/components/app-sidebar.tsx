import * as React from "react"
import { Plus } from "lucide-react"

import { Calendars } from "@/components/calendars"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import CalendarBodyDayCalendar from "./calendar/body/day/calendar-body-day-calendar"
import CalendarBodyDayEvents from "./calendar/body/day/calendar-body-day-events"
import { useCalendarContext } from "./calendar/calendar-context"

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   calendars: [
//     {
//       name: "My Calendars",
//       items: ["Personal", "Work", "Family"],
//     },
//     {
//       name: "Favorites",
//       items: ["Holidays", "Birthdays"],
//     },
//     {
//       name: "Other",
//       items: ["Travel", "Reminders", "Deadlines"],
//     },
//   ],
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setNewCalendarDialogOpen } = useCalendarContext()
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        {/* <TimeRotate /> */}
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col flex-grow divide-y max-w-[276px]">
          <CalendarBodyDayCalendar />
          <CalendarBodyDayEvents />
        </div>
        <SidebarSeparator className="mx-0" />
        <Calendars />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setNewCalendarDialogOpen(true)}>
              <Plus />
              <span>Ajouter un calendrier</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
