'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import { PlanActivityDialog } from '@/features/plan-activity/components/PlanActivityDialog';

const CalendarContainer = styled.div`
  .fc-daygrid-day,
  .fc-timegrid-col {
    cursor: pointer;
  }

  .fc-daygrid-day-frame,
  .fc-daygrid-day-events,
  .fc-daygrid-body {
    pointer-events: auto;
  }
`;

export function CalendarView() {
  return (
    <CalendarContainer>
      <PlanActivityDialog showTrigger />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="85vh"
        aspectRatio={1.5}
        dateClick={(info) => {
          console.log('Date clicked:', info);
        }}
      />
    </CalendarContainer>
  );
}
