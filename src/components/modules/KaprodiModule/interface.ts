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
export type KaprodiPagination= {
    page: number;
    totalHead: number;
    totalPage: number;
    from: number;
    to: number;
}