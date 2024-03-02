import { Table, Thead, Tbody, Tr, Th, Td, Checkbox, Flex, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { ListKaprodi } from "./interface";

export const ListSection: React.FC<ListKaprodi> = ({kaprodi}) => {
    return (
        <section>
            <Flex justify="center" width="100%" margin={10}>
                <div className="study-program" style={{ width: '50%', border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox />
                                </Th>
                                <Th>Nama</Th>
                                <Th>Email</Th>
                                <Th>Program Studi</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {kaprodi ? (
                            kaprodi.map((data) => (
                                <Tr key={data.id}>
                                    <Td>
                                        <Checkbox />
                                    </Td>
                                    <Td>{data.name}</Td>
                                    <Td>{data.email}</Td>
                                    <Td>{data.headStudyProgram?.studyProgram?.name}</Td>
                                    <Td textAlign={"center"}>
                                        <IconButton
                                            size={'lg'}
                                            color={'black'}
                                            icon={<FiEdit />}
                                            aria-label={'Edit Prodi'}
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
