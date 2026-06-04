import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreatePlan } from "./CreatePlan";

export function PlanDialog({ showTrigger, open }: { showTrigger?: boolean; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={open ?? isOpen} onOpenChange={setIsOpen}>
      {showTrigger && <DialogTrigger render={<Button>Create Plan</Button>}></DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Plan</DialogTitle>
          <DialogDescription>
            Create a new workout plan to track your progress.
          </DialogDescription>
        </DialogHeader>
        <CreatePlan onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}