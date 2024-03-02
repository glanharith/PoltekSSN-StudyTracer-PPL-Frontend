import { StudyProgram } from "../../interface";

export interface ContentSectionProps {
    refetchData: () => void;
    studyProgram: StudyProgram[]
}