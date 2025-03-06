import { useCalendarContext } from '../../calendar-context'
import { Calendar } from '@/components/ui/calendar'

export default function CalendarBodyDayCalendar() {
  const { date, setDate } = useCalendarContext()
  return (
    <Calendar
      selected={date}
      month={date}
      onSelect={(date: Date | undefined) => date && setDate(date)}
      mode="single"
    />
  )
}
