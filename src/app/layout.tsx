import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { CoursesProvider } from '@/contexts/CoursesContext';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'GradePilot',
  description: 'Track your semester grades with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <CoursesProvider>
          {children}
        </CoursesProvider>
        <Toaster />
      </body>
    </html>
  );
}
