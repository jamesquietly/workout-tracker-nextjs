import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CreatePlanActivity } from './CreatePlanActivity';

export function PlanActivityDialog({
  showTrigger,
  open,
}: {
  showTrigger?: boolean;
  open?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={open ?? isOpen} onOpenChange={setIsOpen}>
      {showTrigger && (
        <DialogTrigger
          render={<Button className="text-2xl py-5">Add workout</Button>}
        ></DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Workout</DialogTitle>
          <DialogDescription>
            Add a workout to the calendar.
          </DialogDescription>
        </DialogHeader>
        <CreatePlanActivity onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
