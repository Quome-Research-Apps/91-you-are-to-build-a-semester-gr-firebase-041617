'use client';
import { useState } from 'react';
import type { Course } from '@/lib/types';
import { useCoursesContext } from '@/contexts/CoursesContext';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AddAssignmentDialog } from './AddAssignmentDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CourseDetailsSheetProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseDetailsSheet({ course, open, onOpenChange }: CourseDetailsSheetProps) {
  const { deleteAssignment } = useCoursesContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any | null>(null);

  const handleEdit = (assignment: any) => {
    setEditingAssignment(assignment);
    setIsAddDialogOpen(true);
  }

  const handleAddNew = () => {
    setEditingAssignment(null);
    setIsAddDialogOpen(true);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg p-0">
          <SheetHeader className="p-6">
            <SheetTitle className="font-headline text-2xl">{course.name}</SheetTitle>
            <SheetDescription>View, add, and manage assignments for this course.</SheetDescription>
          </SheetHeader>
          <div className="p-6 border-t">
            <div className="flex justify-end mb-4">
              <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Assignment
              </Button>
            </div>
            {course.assignments.length > 0 ? (
              <div className="overflow-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                      <TableHead className="text-right">Weight</TableHead>
                      <TableHead className="text-right w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.assignments.map(assignment => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.name}</TableCell>
                        <TableCell className="text-right">{assignment.grade}%</TableCell>
                        <TableCell className="text-right">{assignment.weight}%</TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(assignment)}>
                              <Edit className="h-4 w-4" />
                           </Button>
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete "{assignment.name}"?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the assignment.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteAssignment(course.id, assignment.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No assignments added yet.</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <AddAssignmentDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        courseId={course.id}
        assignment={editingAssignment}
      />
    </>
  );
}
