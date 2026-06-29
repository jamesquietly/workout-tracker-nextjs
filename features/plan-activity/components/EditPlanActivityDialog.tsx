import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EditPlanActivity } from './EditPlanAcitivity';
import { PlanActivity } from '@/features/plan-activity/interfaces/PlanActivity';

export function EditPlanActivityDialog({
  open,
  planActivity,
  setIsOpen,
}: {
  open?: boolean;
  planActivity?: PlanActivity;
  setIsOpen?: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Workout</DialogTitle>
          <DialogDescription>
            Edit a workout in the calendar.
          </DialogDescription>
        </DialogHeader>
        <EditPlanActivity onCancel={() => setIsOpen?.(false)} planActivity={planActivity} />
      </DialogContent>
    </Dialog>
  );
}
