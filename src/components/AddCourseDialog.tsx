'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCoursesContext } from '@/contexts/CoursesContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1, 'Course name is required').max(50, 'Course name is too long'),
});

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCourseDialog({ open, onOpenChange }: AddCourseDialogProps) {
  const { addCourse } = useCoursesContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addCourse(values.name);
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
          <DialogTitle>Add a New Course</DialogTitle>
          <DialogDescription>Enter the name of your course for this semester.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CHEM-101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
              <Button type="submit">Add Course</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
