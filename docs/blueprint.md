# **App Name**: GradePilot

## Core Features:

- Course Addition: Add a course to the semester with a course name.
- Dashboard View: Display all added courses on a dashboard.
- Assignment Addition: Add assignments to a course with name, grade, and weight (optional).
- Grade Calculation: Automatically calculate the current average grade for each course based on added assignments. Use a tool powered by AI to determine letter grades for each assignment if these are not pre-defined in number form.
- GPA Calculation: Calculate the overall semester GPA from the current grade in each course.
- Local Storage Persistence: Persist course and assignment data in the browser's `localStorage` to preserve data between sessions.

## Style Guidelines:

- Primary color: HSL based vivid cyan (#3498DB converted to RGB) to reflect focus and clarity. The choice of cyan avoids the cliché of money apps being green. HSL=(203, 67, 53)
- Background color: Very light cyan background (#EBF5FB converted to RGB) to provide a clean, non-distracting backdrop. HSL=(203, 50, 95)
- Accent color: Blue (#4878B6 converted to RGB), to draw attention to interactive elements. HSL=(223, 45, 49)
- Font pairing: 'Poppins' (geometric sans-serif) for headlines, 'PT Sans' (humanist sans-serif) for body text.
- Simple, outline-style icons for course management and assignment types.
- Clean and structured layout with clear visual hierarchy for easy navigation.
- Subtle transitions and animations when adding or updating courses/assignments to provide visual feedback.