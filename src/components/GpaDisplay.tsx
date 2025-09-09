'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCoursesContext } from '@/contexts/CoursesContext';
import { calculateCourseAverage, gradeToGpa } from '@/lib/grade-utils';
import { determineLetterGrade } from '@/ai/flows/determine-letter-grade';
import { Skeleton } from '@/components/ui/skeleton';

export function GpaDisplay() {
  const { courses } = useCoursesContext();
  const [overallGpa, setOverallGpa] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const coursesWithAssignments = useMemo(() => courses.filter(course => course.assignments.length > 0), [courses]);

  useEffect(() => {
    const calculateGpa = async () => {
      if (coursesWithAssignments.length === 0) {
        setOverallGpa(0);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const courseGpaPromises = coursesWithAssignments.map(async (course) => {
          const average = calculateCourseAverage(course.assignments);
          if (average === null) {
            return null;
          }
          const { letterGrade } = await determineLetterGrade({ numericalScore: average });
          return gradeToGpa(letterGrade);
        });

        const gpaValues = (await Promise.all(courseGpaPromises)).filter(gpa => gpa !== null) as number[];

        if (gpaValues.length > 0) {
          const totalGpa = gpaValues.reduce((sum, gpa) => sum + gpa, 0);
          setOverallGpa(totalGpa / gpaValues.length);
        } else {
          setOverallGpa(0);
        }
      } catch (error) {
        console.error("Failed to calculate GPA:", error);
        setOverallGpa(null); // Indicate error state
      } finally {
        setIsLoading(false);
      }
    };

    calculateGpa();
  }, [coursesWithAssignments]);
  
  const GpaCircle = () => {
    if (isLoading) {
      return <Skeleton className="h-24 w-24 rounded-full" />;
    }

    return (
      <div className="relative h-24 w-24 rounded-full bg-card shadow-md flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="absolute inset-1 rounded-full border-4 border-primary/20"></div>
        <div className="relative text-center">
          <span className="block text-3xl font-bold font-headline text-primary">
            {overallGpa !== null ? overallGpa.toFixed(2) : 'N/A'}
          </span>
          <span className="block text-xs font-semibold text-muted-foreground -mt-1">GPA</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-bold font-headline text-foreground">Your Semester</h2>
        <p className="text-muted-foreground mt-1">An overview of your academic performance.</p>
      </div>
      <GpaCircle />
    </div>
  );
}
