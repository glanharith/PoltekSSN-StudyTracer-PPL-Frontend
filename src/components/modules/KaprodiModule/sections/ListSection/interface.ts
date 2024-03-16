import { Kaprodi } from "../../interface";
import { Dispatch, SetStateAction } from 'react';

export interface ListKaprodi{
    refetchData: () => void;
    kaprodi: Kaprodi[];
    selectedKaprodi: string[];
    setSelectedKaprodi: Dispatch<SetStateAction<string[]>>;
}
