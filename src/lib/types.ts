export interface Assignment {
  id: string;
  name: string;
  grade: number; // Storing as number 0-100
  weight: number; // Storing as percentage 0-100
}

export interface Course {
  id: string;
  name: string;
  assignments: Assignment[];
}
