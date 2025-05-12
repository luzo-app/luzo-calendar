import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCalendarContext } from '../calendar-context'
import { DateTimePicker } from '@/components/form/date-time-picker'
import { ColorPicker } from '@/components/form/color-picker'

import eventService from '@/api/events'
import { processError } from '@/api/error'

import { Event } from '@/types/event'

const formSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    start: z.string().datetime({ offset: true }),
    end: z.string().datetime({ offset: true }),
    color: z.string(),
  })
  .refine(
    (data) => {
      const start = new Date(data.start)
      const end = new Date(data.end)
      return end >= start
    },
    {
      message: 'End time must be after start time',
      path: ['end'],
    }
  )

export default function CalendarNewEventDialog() {
  const { newEventDialogOpen, setNewEventDialogOpen, date, events, setEvents, calendarDayClicked } =
    useCalendarContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: calendarDayClicked?.toISOString() || date.toISOString(),
      end: calendarDayClicked?.toISOString() || date.toISOString(),
      color: 'blue',
    },
  })

  useEffect(() => {
    if (calendarDayClicked) {
      form.reset({
        title: '',
        start: calendarDayClicked.toISOString(),
        end: calendarDayClicked?.toISOString() || date.toISOString(),
        color: 'blue',
      })
    }
  }, [calendarDayClicked, date, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newEvent = {
      title: values.title,
      start: new Date(values.start),
      end: new Date(values.end),
      color: values.color,
    }
    eventService.createEvent(newEvent)
      .then((response) => {
        const resEvent = response.data as Event
        setEvents([...events, resEvent])
        setNewEventDialogOpen(false)
        form.reset()
      })
      .catch((error) => {
        processError(error)
        setEvents(events)
      })
  }

  return (
    <Dialog open={newEventDialogOpen} onOpenChange={setNewEventDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un événement</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de l'événement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Début</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Fin</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Couleur</FormLabel>
                  <FormControl>
                    <ColorPicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Ajouter l'événement</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}