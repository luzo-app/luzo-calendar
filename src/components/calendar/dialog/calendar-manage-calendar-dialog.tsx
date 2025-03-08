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
import calendarService from '@/api/calendars'
import { Calendar } from '@/types/calendar'
import { processError } from '@/api/error'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  items: z.array(z.string()).min(1, 'Au moins un élément est requis'),
})

export default function CalendarManageCalendarDialog() {
  const {
    manageCalendarDialogOpen,
    setManageCalendarDialogOpen,
    selectedCalendar,
    setSelectedCalendar,
    calendars,
    setCalendars,
  } = useCalendarContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      items: [''],
    },
  })

  useEffect(() => {
    if (selectedCalendar) {
      form.reset({
        name: selectedCalendar.name,
        items: selectedCalendar.items.length > 0 ? selectedCalendar.items : [''],
      })
    }
  }, [selectedCalendar, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedCalendar) return

    const updatedCalendar = {
      ...selectedCalendar,
      name: values.name,
      items: values.items.filter((item) => item.trim() !== ''),
    }

    calendarService
      .updateCalendar(selectedCalendar.id, updatedCalendar)
      .then((response) => {
        const resCalendar = response.data as Calendar
        setCalendars(
          calendars.map((cal) =>
            cal.id === selectedCalendar.id ? resCalendar : cal
          )
        )
        handleClose()
      })
      .catch((error) => {
        processError(error)
        setCalendars(calendars)
      })
  }

  function handleClose() {
    setManageCalendarDialogOpen(false)
    setSelectedCalendar(null)
    form.reset()
  }

  return (
    <Dialog open={manageCalendarDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le calendrier</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nom du calendrier</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du calendrier" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Catégories</FormLabel>
                  <FormControl>
                    <>
                      {field.value.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <Input
                            placeholder={`Catégorie ${index + 1}`}
                            value={item}
                            onChange={(e) => {
                              const newItems = [...field.value]
                              newItems[index] = e.target.value
                              field.onChange(newItems)
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                              const newItems = field.value.filter((_, i) => i !== index)
                              field.onChange(newItems)
                            }}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => field.onChange([...field.value, ''])}
                      >
                        Ajouter une catégorie
                      </Button>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Enregistrer les modifications</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}