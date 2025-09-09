'use client';
import React, { createContext, useContext } from 'react';
import { useCourses } from '@/hooks/use-courses';

type CoursesContextType = ReturnType<typeof useCourses>;

const CoursesContext = createContext<CoursesContextType | null>(null);

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const value = useCourses();
  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}

export function useCoursesContext() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCoursesContext must be used within a CoursesProvider');
  }
  return context;
}
