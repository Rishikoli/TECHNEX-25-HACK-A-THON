export type QuestionCategory = 'introduction' | 'experience' | 'behavioral' | 'technical' | 'company' | 'career' | 'closing';

export interface Question {
  id: string;
  question: string;
  modelAnswer: string;
  tips: string[];
  category: QuestionCategory;
  importance: 'high' | 'medium' | 'low';
  commonFollowUps?: string[];
  thingsToAvoid?: string[];
  preparationPoints?: string[];
}

export interface QuestionBank {
  [key in QuestionCategory]: Question[];
}
