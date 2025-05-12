import { useCalendarContext } from '../../calendar-context'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import CalendarHeaderDateIcon from './calendar-header-date-icon'
import CalendarHeaderDateChevrons from './calendar-header-date-chevrons'
import CalendarHeaderDateBadge from './calendar-header-date-badge'
import { capitalizeFirstLetter } from '@/lib/utils'

export default function CalendarHeaderDate() {
  const { date } = useCalendarContext()
  return (
    <div className="flex items-center gap-2">
      <CalendarHeaderDateIcon />
      <div>
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">{capitalizeFirstLetter(format(date, 'MMMM yyyy', { locale: fr }))}</p>
          <CalendarHeaderDateBadge />
        </div>
        <CalendarHeaderDateChevrons />
      </div>
    </div>
  )
}
