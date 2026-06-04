import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plan } from '@/features/plan/interfaces/Plan';
import { EditPlan } from '@/features/plan/components/EditPlan';
import { useState } from 'react';

export function PlanCard({ plan }: { plan: Plan }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{plan.title}</CardTitle>
            <CardDescription className="whitespace-pre-line">
              {plan.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Plan</DialogTitle>
        </DialogHeader>
        <EditPlan onCancel={() => setIsOpen(false)} plan={plan} />
      </DialogContent>
    </Dialog>
  );
}
