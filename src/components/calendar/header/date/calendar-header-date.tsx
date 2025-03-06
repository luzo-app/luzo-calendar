import { useCalendarContext } from '../../calendar-context'
// import { format } from 'date-fns'
// import CalendarHeaderDateIcon from './calendar-header-date-icon'
// import CalendarHeaderDateChevrons from './calendar-header-date-chevrons'
// import CalendarHeaderDateBadge from './calendar-header-date-badge'
import { Button } from '@/components/ui/button'

export default function CalendarHeaderDate() {
  const { setDate } = useCalendarContext()
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setDate(new Date())}
      >
        Aujourd'hui
      </Button>
      {/* <CalendarHeaderDateIcon /> */}
      {/* <div>
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">{format(date, 'MMMM yyyy')}</p>
          <CalendarHeaderDateBadge />
        </div>
        <CalendarHeaderDateChevrons />
      </div> */}
    </div>
  )
}
