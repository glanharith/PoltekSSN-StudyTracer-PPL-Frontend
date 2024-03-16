import { Table, Thead, Tbody, Tr, Th, Td, Checkbox, Flex, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import React, { useState, useEffect } from 'react';
import { ListKaprodi } from "./interface";
import { Kaprodi } from '../../interface';
import EditHeadOfStudyProgramModal from "@/components/elements/EditHeadOfStudyProgramModal";

export const ListSection: React.FC<ListKaprodi> = ({refetchData, kaprodi, selectedKaprodi, setSelectedKaprodi}) => {
    const [allSelected, setAllSelected] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [kaprodiId, setKaprodiId] = useState<string>('');
    const [kaprodiName, setKaprodiName] = useState<string>('');
    const [studyProgramId, setStudyProgramId] = useState<string>('');
    const [studyProgramName, setStudyProgramName] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false)

    const handleCheckboxChange = (kepala: Kaprodi) => {
        setSelectedKaprodi((currentSelectedKaprodi) => {
            let updatedSelectedKaprodi;
            if (currentSelectedKaprodi.includes(kepala.id)) {
                updatedSelectedKaprodi= currentSelectedKaprodi.filter(
                    (id) => id !== kepala.id,
                );
            }
            else {
                updatedSelectedKaprodi = [...currentSelectedKaprodi, kepala.id];
            }
            const allSelected = 
                updatedSelectedKaprodi.length === kaprodi.length;
            setAllSelected(allSelected);
            return updatedSelectedKaprodi;
        });
    };

    const handleSelectAll = () => {
        setSelectedKaprodi((currentSelectedKaprodi) => {
            if (currentSelectedKaprodi.length === kaprodi.length) {
                setAllSelected(false);
                return [];
            }
            else {
                setAllSelected(true);
                return kaprodi.map((kepala) => kepala.id);
            }
        })
    };

    const handleOpenEditModal = (
        kaprodiId: string, 
        kaprodiName: string,
        studyProgramId: string,
        studyProgramName: string,
        isActive: boolean,
        ) => {
        setIsModalOpen(true);
        setKaprodiId(kaprodiId);
        setKaprodiName(kaprodiName);
        setStudyProgramId(studyProgramId);
        setStudyProgramName(studyProgramName);
        setIsActive(isActive);
    };
    const handleCloseEditModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section>
            <Flex justify="center" width="100%" margin={10}>
                <div className="study-program" style={{ width: '70%', border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox 
                                        aria-label="checkbox"
                                        isChecked={allSelected}
                                        onChange={handleSelectAll}
                                        mr={4}
                                    />
                                </Th>
                                <Th>NIP</Th>
                                <Th>Nama</Th>
                                <Th>Email</Th>
                                <Th>Program Studi</Th>
                                <Th>Status Active</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {kaprodi ? (
                            kaprodi.map((data) => (
                                <Tr key={data.id}>
                                    <Td>
                                        <Checkbox 
                                            aria-label="checkboxes"
                                            isChecked={selectedKaprodi.includes(data.id)}
                                            onChange={() => handleCheckboxChange(data)}
                                        />
                                    </Td>
                                    <Td>{data.headStudyProgram.nip}</Td>
                                    <Td>{data.name}</Td>
                                    <Td>{data.email}</Td>
                                    <Td>{data.headStudyProgram?.studyProgram?.name}</Td>
                                    <Td>
                                        <div className={` w-fit px-3 py-2 rounded-2xl ${data.headStudyProgram.isActive ? "bg-green-700" : "bg-red-500"}`}>
                                            <span className=" font-bold text-white">
                                                {data.headStudyProgram.isActive ? "Aktif" : "Tidak"}
                                            </span>
                                        </div>
                                    </Td>
                                    <Td textAlign={"center"}>
                                        <IconButton
                                            size={'lg'}
                                            color={'black'}
                                            icon={<FiEdit />}
                                            aria-label={'Edit Prodi'}
                                            onClick={() => handleOpenEditModal(
                                                data.id, 
                                                data.name, 
                                                data.headStudyProgram?.studyProgram?.id, 
                                                data.headStudyProgram?.studyProgram?.name,
                                                data.headStudyProgram?.isActive)}
                                        />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={5} textAlign="center">Loading Kaprodi...</Td>
                            </Tr>
                        )}
                        </Tbody>
                    </Table>
                </div>
                <EditHeadOfStudyProgramModal
                    isOpen={isModalOpen}
                    onClose={handleCloseEditModal}
                    kaprodiId={kaprodiId}
                    kaprodiName={kaprodiName}
                    studyProgramId={studyProgramId}
                    studyProgramName={studyProgramName}
                    refetchData={refetchData}
                    isActive = {isActive}
                />  
            </Flex>
        </section>
    )
}
