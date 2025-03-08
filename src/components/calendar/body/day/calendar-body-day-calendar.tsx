import { useCalendarContext } from '../../calendar-context'
import { Calendar } from '@/components/ui/calendar'

export default function CalendarBodyDayCalendar() {
  const { date, setDate } = useCalendarContext()
  return (
    <Calendar
      today={date}
      selected={date}
      month={date}
      onSelect={(date: Date | undefined) => date && setDate(date)}
      onMonthChange={setDate}
      onDayClick={setDate}
      mode="single"
    />
  )
}
