'use client';
import { useState } from 'react';
import { useCoursesContext } from '@/contexts/CoursesContext';
import { PlusCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { AddCourseDialog } from '@/components/AddCourseDialog';

export function CourseList() {
  const { courses } = useCoursesContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold font-headline text-foreground">Courses</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No courses yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Add your first course to start tracking your grades.</p>
        </div>
      )}
      
      <AddCourseDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}
