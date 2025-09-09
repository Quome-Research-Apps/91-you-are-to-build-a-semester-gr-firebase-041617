import type { Assignment } from './types';

export const calculateCourseAverage = (assignments: Assignment[]): number | null => {
  if (assignments.length === 0) {
    return null;
  }

  const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0);

  if (totalWeight > 0) {
    // Weighted average
    if (totalWeight > 100) {
      console.warn("Total weight exceeds 100%. Calculation might be inaccurate.");
    }
    const weightedSum = assignments.reduce((sum, a) => sum + a.grade * (a.weight / 100), 0);
    const effectiveTotalWeight = Math.min(totalWeight, 100);
    return weightedSum / (effectiveTotalWeight / 100);
  } else {
    // Simple average
    const simpleSum = assignments.reduce((sum, a) => sum + a.grade, 0);
    return simpleSum / assignments.length;
  }
};

export const gradeToGpa = (letterGrade: string): number => {
  switch (letterGrade.toUpperCase()) {
    case 'A':
      return 4.0;
    case 'B':
      return 3.0;
    case 'C':
      return 2.0;
    case 'D':
      return 1.0;
    case 'F':
      return 0.0;
    default:
      return 0.0;
  }
};
