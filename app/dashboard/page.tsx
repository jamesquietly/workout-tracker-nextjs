'use client';

import { useUser } from '@/features/user/contexts/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarView } from '@/features/calendar/components/CalendarView';
import { PlanDialog } from '@/features/plan/components/PlanDialog';

export default function Dashboard() {
  const user = useUser();
  console.log('user', user);
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
      </TabsContent>
    </Tabs>
  );
}
