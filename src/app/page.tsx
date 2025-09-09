'use client';

import { Header } from '@/components/Header';
import { CourseList } from '@/components/CourseList';
import { GpaDisplay } from '@/components/GpaDisplay';
import { useCoursesContext } from '@/contexts/CoursesContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { isInitialized } = useCoursesContext();

  const AppSkeleton = () => (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </main>
    </div>
  );

  if (!isInitialized) {
    return <AppSkeleton />;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <GpaDisplay />
        <CourseList />
      </main>
    </div>
  );
}
