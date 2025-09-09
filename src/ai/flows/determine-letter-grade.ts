'use server';

/**
 * @fileOverview A flow to determine the letter grade for an assignment based on its numerical score.
 *
 * - determineLetterGrade - A function that determines the letter grade based on the score.
 * - DetermineLetterGradeInput - The input type for the determineLetterGrade function.
 * - DetermineLetterGradeOutput - The return type for the determineLetterGrade function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetermineLetterGradeInputSchema = z.object({
  numericalScore: z
    .number()
    .describe('The numerical score of the assignment (e.g., 95).'),
});
export type DetermineLetterGradeInput = z.infer<typeof DetermineLetterGradeInputSchema>;

const DetermineLetterGradeOutputSchema = z.object({
  letterGrade: z.string().describe('The letter grade corresponding to the numerical score (e.g., A).'),
});
export type DetermineLetterGradeOutput = z.infer<typeof DetermineLetterGradeOutputSchema>;

export async function determineLetterGrade(input: DetermineLetterGradeInput): Promise<DetermineLetterGradeOutput> {
  return determineLetterGradeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'determineLetterGradePrompt',
  input: {schema: DetermineLetterGradeInputSchema},
  output: {schema: DetermineLetterGradeOutputSchema},
  prompt: `You are a grading assistant. You will receive a numerical score for an assignment and must determine the appropriate letter grade.

  Here is the grading scale:
  - 90-100: A
  - 80-89: B
  - 70-79: C
  - 60-69: D
  - Below 60: F

  Given the numerical score: {{{numericalScore}}}, determine the letter grade.
  Return only the letter grade without any additional text.`,
});

const determineLetterGradeFlow = ai.defineFlow(
  {
    name: 'determineLetterGradeFlow',
    inputSchema: DetermineLetterGradeInputSchema,
    outputSchema: DetermineLetterGradeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
