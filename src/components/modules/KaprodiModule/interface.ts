export interface Kaprodi {
    id: string
    name: string
    headStudyProgram: {
        studyProgram: {
            name: string
            id: string
        },
        isActive: boolean,
        nip: string,
    }
    email: string
}