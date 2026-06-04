import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form-nextjs';
import styled from 'styled-components';
import { z } from 'zod';
import useCreatePlan from '@/features/plan/hooks/useCreatePlan';
import { toast } from 'sonner';

const createPlanSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export function CreatePlan({ onCancel }: { onCancel?: () => void }) {
  const { mutateAsync: createPlanAsync } = useCreatePlan(onCancel);
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    validators: {
      onSubmit: createPlanSchema,
    },
    onSubmit: async ({ value }) => {
      toast.promise(createPlanAsync(value), {
        loading: 'Creating plan...',
        success: 'Plan created successfully',
        error: 'Failed to create plan',
      });
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
        <Button type="submit">Create</Button>
      </ButtonContainer>
    </form>
  );
}
