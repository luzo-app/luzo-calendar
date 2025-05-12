import * as React from "react"
import {
  Check,
  ChevronRight,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCalendarContext } from "./calendar/calendar-context"

import calendarService from "@/api/calendars"
import { processError } from "@/api/error"

import { useAlertDialog } from "@/hooks/use-alert-dialog"

export function Calendars() {
  const {
    calendars,
    setCalendars,
    setSelectedCalendar,
    setManageCalendarDialogOpen
  } = useCalendarContext()
  const alertDialog = useAlertDialog()

  const deleteCalendar = async (id: number): Promise<void> => {
    calendarService.deleteCalendar(id)
      .then(() => {
        setCalendars(calendars.filter(calendar => calendar.id !== id))
      })
      .catch(processError)
  }

  return (
    <>
      {
        calendars.map((calendar, index) => (
          <React.Fragment key={calendar.name}>
            <SidebarGroup key={calendar.name}>
              <Collapsible
                defaultOpen={index === 0}
                className="group/collapsible relative"
              >
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
                >
                  <CollapsibleTrigger className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          {calendar.name}
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCalendar(calendar)
                            setManageCalendarDialogOpen(true)
                          }}
                        >
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            alertDialog({
                              title: "Supprimer le calendrier",
                              description: `Êtes-vous sûr de vouloir supprimer le calendrier "${calendar.name}" ?`,
                              onConfirm: () => {
                                deleteCalendar(calendar.id)
                              }
                            })
                          }}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 z-10" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {calendar.items.map((item) => (
                        <SidebarMenuItem key={item}>
                          <SidebarMenuButton>
                            <div
                              // data-active={index === 0}
                              className="group/calendar-item border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border"
                            >
                              <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
                            </div>
                            {item}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
            <SidebarSeparator className="mx-0" />
          </React.Fragment>
        ))
      }
    </>
  )
}
