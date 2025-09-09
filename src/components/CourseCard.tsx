'use client';
import { useState, useEffect, useMemo } from 'react';
import type { Course } from '@/lib/types';
import { useCoursesContext } from '@/contexts/CoursesContext';
import { calculateCourseAverage } from '@/lib/grade-utils';
import { determineLetterGrade } from '@/ai/flows/determine-letter-grade';
import { MoreVertical, Trash2, Book, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CourseDetailsSheet } from './CourseDetailsSheet';
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

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { deleteCourse } = useCoursesContext();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [letterGrade, setLetterGrade] = useState<string | null>(null);
  const [isLoadingGrade, setIsLoadingGrade] = useState(false);

  const courseAverage = useMemo(() => calculateCourseAverage(course.assignments), [course.assignments]);

  useEffect(() => {
    if (courseAverage !== null) {
      setIsLoadingGrade(true);
      determineLetterGrade({ numericalScore: courseAverage })
        .then(result => setLetterGrade(result.letterGrade))
        .catch(error => {
          console.error("Failed to determine letter grade:", error);
          setLetterGrade('?');
        })
        .finally(() => setIsLoadingGrade(false));
    } else {
      setLetterGrade(null);
    }
  }, [courseAverage]);
  
  return (
    <>
      <Card className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle className="font-headline text-xl">{course.name}</CardTitle>
            <CardDescription>{course.assignments.length} assignment(s)</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the course "{course.name}" and all its assignments. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteCourse(course.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
            <div className="text-center">
                {courseAverage !== null ? (
                    <>
                        <span className="text-5xl font-bold text-foreground">{courseAverage.toFixed(1)}%</span>
                        <div className="h-6 mt-1">
                            {isLoadingGrade ? (
                                <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                            ) : (
                                <span className="text-2xl font-semibold text-primary">{letterGrade}</span>
                            )}
                        </div>
                    </>
                ) : (
                    <span className="text-lg text-muted-foreground">No grades yet</span>
                )}
            </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => setIsSheetOpen(true)}>
            <Book className="mr-2 h-4 w-4" /> View Details
          </Button>
        </CardFooter>
      </Card>
      <CourseDetailsSheet course={course} open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
}
