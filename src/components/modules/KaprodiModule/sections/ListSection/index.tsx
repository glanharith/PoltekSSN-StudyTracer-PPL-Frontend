import { Table, Thead, Tbody, Tr, Th, Td, Checkbox, Flex, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import React, { useState, useEffect } from 'react';
import { ListKaprodi } from "./interface";
import { Kaprodi } from '../../interface';

export const ListSection: React.FC<ListKaprodi> = ({kaprodi, selectedKaprodi, setSelectedKaprodi}) => {
    const [allSelected, setAllSelected] = useState(false);

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

    return (
        <section>
            <Flex justify="center" width="100%" margin={10}>
                <div className="study-program" style={{ width: '50%', border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
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
                                <Th>Nama</Th>
                                <Th>Email</Th>
                                <Th>Program Studi</Th>
                                <Th>Edit</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {kaprodi ? (
                            kaprodi.map((data) => (
                                <Tr key={data.id}>
                                    <Td>
                                        <Checkbox 
                                            isChecked={selectedKaprodi.includes(data.id)}
                                            onChange={() => handleCheckboxChange(data)}
                                        />
                                    </Td>
                                    <Td>{data.name}</Td>
                                    <Td>{data.email}</Td>
                                    <Td>{data.headStudyProgram?.studyProgram?.name}</Td>
                                    <Td textAlign={"center"}>
                                        <IconButton
                                            size={'lg'}
                                            color={'black'}
                                            icon={<FiEdit />}
                                            aria-label={'Edit Kaprodi'}
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
            </Flex>
        </section>
    )
}
