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
  onCancel,
  onDelete,
}: {
  open?: boolean;
  planActivity?: PlanActivity;
  onCancel?: () => void;
  onDelete?: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Workout</DialogTitle>
          <DialogDescription>Edit a workout in the calendar.</DialogDescription>
        </DialogHeader>
        <EditPlanActivity
          onCancel={onCancel}
          planActivity={planActivity}
          onDelete={onDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
