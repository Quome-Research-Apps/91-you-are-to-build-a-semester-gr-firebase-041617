'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Course, Assignment } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

const LOCAL_STORAGE_KEY = 'gradePilotCourses';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedCourses = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      }
    } catch (error) {
      console.error('Failed to load courses from localStorage', error);
      toast({
        title: "Error",
        description: "Could not load data from your browser's storage.",
        variant: "destructive",
      });
    } finally {
      setIsInitialized(true);
    }
  }, [toast]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
      } catch (error) {
        console.error('Failed to save courses to localStorage', error);
        toast({
          title: "Error",
          description: "Could not save data to your browser's storage.",
          variant: "destructive",
        });
      }
    }
  }, [courses, isInitialized, toast]);

  const addCourse = useCallback((name: string) => {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      name,
      assignments: [],
    };
    setCourses(prevCourses => [...prevCourses, newCourse]);
  }, []);

  const deleteCourse = useCallback((courseId: string) => {
    setCourses(prevCourses => prevCourses.filter(c => c.id !== courseId));
  }, []);
  
  const updateCourseName = useCallback((courseId: string, newName: string) => {
    setCourses(prevCourses => prevCourses.map(c => c.id === courseId ? {...c, name: newName} : c));
  }, []);

  const addAssignment = useCallback((courseId: string, assignmentData: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: crypto.randomUUID(),
    };
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, assignments: [...course.assignments, newAssignment] }
          : course
      )
    );
  }, []);

  const updateAssignment = useCallback((courseId: string, assignment: Assignment) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, assignments: course.assignments.map(a => a.id === assignment.id ? assignment : a) }
          : course
      )
    );
  }, []);

  const deleteAssignment = useCallback((courseId: string, assignmentId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, assignments: course.assignments.filter(a => a.id !== assignmentId) }
          : course
      )
    );
  }, []);

  return {
    courses,
    addCourse,
    deleteCourse,
    updateCourseName,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    isInitialized,
  };
};
