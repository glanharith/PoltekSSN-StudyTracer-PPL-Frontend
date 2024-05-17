import { Kaprodi, KaprodiPagination } from "../../interface";
import { Dispatch, SetStateAction } from 'react';

export interface ListKaprodi{
    refetchData: () => void;
    kaprodi: Kaprodi[];
    selectedKaprodi: string[];
    setSelectedKaprodi: Dispatch<SetStateAction<string[]>>;
    pagination: KaprodiPagination;
    prevPage: () => void;
    nextPage: () => void;
}
