'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarView } from '@/features/calendar/components/CalendarView';
import { PlanDialog } from '@/features/plan/components/PlanDialog';
import { PlanList } from '@/features/plan/components/PlanList';

export default function Dashboard() {
  return (
    <Tabs defaultValue="calendar">
      <TabsList className="py-6">
        <TabsTrigger value="calendar" className="text-3xl p-6">Calendar</TabsTrigger>
        <TabsTrigger value="plans" className="text-3xl p-6">Workout Plans</TabsTrigger>
      </TabsList>
      <TabsContent value="calendar">
        <CalendarView />
      </TabsContent>
      <TabsContent value="plans">
        <PlanDialog showTrigger={true} />
        <PlanList />
      </TabsContent>
    </Tabs>
  );
}
