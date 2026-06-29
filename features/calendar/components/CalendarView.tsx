'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import { PlanActivityDialog } from '@/features/plan-activity/components/PlanActivityDialog';
import useGetPlanActivities from '@/features/plan-activity/hooks/useGetPlanActivities';
import { useState } from 'react';
import { PlanActivity } from '@/features/plan-activity/interfaces/PlanActivity';
import { EditPlanActivityDialog } from '@/features/plan-activity/components/EditPlanActivityDialog';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import useDeletePlanActivity from '@/features/plan-activity/hooks/useDeletePlanActivity';

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
  const { data: planActivities } = useGetPlanActivities();
  const [openEditPlanActivity, setOpenEditPlanActivity] = useState(false);
  const [selectedPlanActivity, setSelectedPlanActivity] = useState<
    PlanActivity | undefined
  >(undefined);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const { mutate: deletePlanActivity } = useDeletePlanActivity();
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
        events={planActivities?.map((activity) => ({
          title: activity.plan?.title || 'Workout',
          start: activity.assignedDate,
          plan: activity.plan,
          assignedDate: activity.assignedDate,
          notes: activity.notes,
          planActivityId: activity.id,
        }))}
        eventClick={(info) => {
          const currentPlanActivity: PlanActivity = {
            id: info.event.extendedProps.planActivityId,
            assignedDate: info.event.extendedProps.assignedDate,
            plan: info.event.extendedProps.plan,
            notes: info.event.extendedProps.notes,
          };
          setSelectedPlanActivity(currentPlanActivity);
          setOpenEditPlanActivity(true);
        }}
      />
      <EditPlanActivityDialog
        open={openEditPlanActivity}
        planActivity={selectedPlanActivity}
        onCancel={() => setOpenEditPlanActivity(false)}
        onDelete={() => {
          setOpenEditPlanActivity(false);
          setOpenDeleteConfirmation(true);
        }}
      />
      <ConfirmationDialog
        open={openDeleteConfirmation}
        title={'Delete Workout'}
        description={`Are you sure you want to delete this workout?`}
        onCancel={() => setOpenDeleteConfirmation(false)}
        onConfirm={() => {
          setOpenDeleteConfirmation(false);
          if (selectedPlanActivity) {
            deletePlanActivity({ id: selectedPlanActivity.id });
            setSelectedPlanActivity(undefined);
          }
        }}
      />
    </CalendarContainer>
  );
}
