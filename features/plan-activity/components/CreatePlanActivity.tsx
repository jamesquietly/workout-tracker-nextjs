import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form-nextjs';
import styled from 'styled-components';
import { z } from 'zod';
import useCreatePlanActivity from '@/features/plan-activity/hooks/useCreatePlanActivity';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import useGetPlans from '@/features/plan/hooks/useGetPlans';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const createPlanActivitySchema = z.object({
  planId: z.number().min(1, 'Plan ID is required'),
  assignedDate: z.date().min(new Date(), 'Assigned date must be in the future'),
  notes: z.string(),
});

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export function CreatePlanActivity({ onCancel }: { onCancel?: () => void }) {
  const { data: plans } = useGetPlans();
  const { mutateAsync: createPlanActivityAsync } =
    useCreatePlanActivity(onCancel);
  const form = useForm({
    defaultValues: {
      planId: 0,
      assignedDate: new Date(),
      notes: '',
    },
    validators: {
      onSubmit: createPlanActivitySchema,
    },
    onSubmit: async ({ value }) => {
      toast.promise(
        createPlanActivityAsync({
          planId: value.planId,
          assignedDate: value.assignedDate,
          notes: value.notes,
        }),
        {
          loading: 'Creating plan activity...',
          success: 'Plan activity created successfully',
          error: 'Failed to create plan',
        },
      );
    },
  });

  const plansOptions = plans?.map((plan) => ({
    value: plan.id,
    label: plan.title,
  }));
  return (
    <form
      id="create-plan-activity-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="planId"
          children={(field) => {
            return (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none"
                >
                  Plan
                </label>
                <Select
                  value={field.state.value ? String(field.state.value) : ''}
                  onValueChange={(val) => field.handleChange(Number(val))}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a plan">
                      {plansOptions?.find((plan) => Number(plan.value) === Number(field.state.value))?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Plans</SelectLabel>
                      {plansOptions?.map((plan) => (
                        <SelectItem key={plan.value} value={String(plan.value)}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-sm font-medium text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            );
          }}
        />
      </FieldGroup>
      <FieldGroup>
        <form.Field
          name="assignedDate"
          children={(field) => {
            return (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pick a Date
                </label>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.state.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value ? (
                          format(field.state.value, 'PPP')
                        ) : (
                          <span>Select a date</span>
                        )}
                      </Button>
                    }
                  ></PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.state.value}
                      onSelect={(date) => field.handleChange(date as Date)}
                    />
                  </PopoverContent>
                </Popover>
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <p className="text-sm font-medium text-destructive">
                    {field.state.meta.errors.join(', ')}
                  </p>
                ) : null}
              </div>
            );
          }}
        />
      </FieldGroup>

      <FieldGroup className="mt-4">
        <form.Field
          name="notes"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Notes"
              />
            </Field>
          )}
        />
      </FieldGroup>

      <ButtonContainer>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </ButtonContainer>
    </form>
  );
}
