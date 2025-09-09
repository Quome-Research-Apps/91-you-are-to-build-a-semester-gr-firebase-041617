'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCoursesContext } from '@/contexts/CoursesContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Assignment } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(1, 'Assignment name is required').max(100),
  grade: z.coerce.number().min(0, "Grade must be at least 0").max(100, "Grade cannot exceed 100"),
  weight: z.coerce.number().min(0, "Weight must be at least 0").max(100, "Weight cannot exceed 100"),
});

interface AddAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  assignment?: Assignment | null;
}

export function AddAssignmentDialog({ open, onOpenChange, courseId, assignment }: AddAssignmentDialogProps) {
  const { addAssignment, updateAssignment } = useCoursesContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      grade: 0,
      weight: 0,
    },
  });

  useEffect(() => {
    if (assignment) {
      form.reset({
        name: assignment.name,
        grade: assignment.grade,
        weight: assignment.weight,
      });
    } else {
      form.reset({ name: '', grade: 0, weight: 0 });
    }
  }, [assignment, form, open]);


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (assignment) {
      updateAssignment(courseId, { ...assignment, ...values });
    } else {
      addAssignment(courseId, values);
    }
    form.reset();
    onOpenChange(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if(!open) {
        form.reset();
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{assignment ? 'Edit' : 'Add'} Assignment</DialogTitle>
          <DialogDescription>
            Enter the details for the assignment.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Midterm Exam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="95" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
              <Button type="submit">{assignment ? 'Save Changes' : 'Add Assignment'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
