export interface QuestionInputProps {
  method: 'update' | 'new';
  remove: () => void;
  index: number;
}
