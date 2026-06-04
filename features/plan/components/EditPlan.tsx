import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form-nextjs';
import styled from 'styled-components';
import { z } from 'zod';
import useUpdatePlan from '@/features/plan/hooks/useUpdatePlan';
import { toast } from 'sonner';
import { Plan } from '@/features/plan/interfaces/Plan';

const editPlanSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export function EditPlan({
  onCancel,
  plan,
}: {
  onCancel?: () => void;
  plan: Plan;
}) {
  const { mutateAsync: updatePlanAsync } = useUpdatePlan(onCancel);
  const form = useForm({
    defaultValues: {
      title: plan.title,
      description: plan.description,
    },
    validators: {
      onSubmit: editPlanSchema,
    },
    onSubmit: async ({ value }) => {
      toast.promise(
        updatePlanAsync({
          id: plan.id,
          title: value.title,
          description: value.description,
        }),
        {
          loading: 'Updating plan...',
          success: 'Plan updated successfully',
          error: 'Failed to update plan',
        },
      );
    },
  });
  return (
    <form
      id="create-plan-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="title"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                id={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Title"
                required
              />
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup className="mt-4">
        <form.Field
          name="description"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Description"
                required
              />
            </Field>
          )}
        />
      </FieldGroup>

      <ButtonContainer>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </ButtonContainer>
    </form>
  );
}
