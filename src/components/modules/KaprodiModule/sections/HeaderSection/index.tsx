import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { MdPlaylistAdd } from 'react-icons/md';
import { HeaderSectionProps } from './interface';
import HeadOfStudyProgramModal from '@/components/elements/HeadOfStudyProgramModal';
import DeleteHeadOfStudyProgramModal from  '@/components/elements/DeleteHeadOfStudyProgramModal';

export const HeaderSection: React.FC<HeaderSectionProps> = ({ refetchData, selectedKaprodi }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [method, setMethod] = useState<'CREATE' | 'EDIT'>('CREATE');
    const [studyProgramId, setStudyProgramId] = useState<string>('');

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenCreateModal = () => {
        setMethod('CREATE');
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStudyProgramId('');
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true)
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }


    return (
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" margin={4}>
            <Flex justify="center" align="center" flex="1">
                <Text
                    color={'blue.900'}
                    fontSize={{ base: 28, md: 30 }}
                    fontWeight="bold"
                    ml={"40%"}
                >
                    Daftar Kepala Program Studi
                </Text>
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} className="buttons">
                <Button
                    rightIcon={<BsTrash />}
                    color={'white'}
                    backgroundColor={'#B81515'}
                    mr={2}
                    size={'sm'}
                    onClick={handleOpenDeleteModal}
                    isDisabled={selectedKaprodi.length === 0}
                >
                    Hapus Kaprodi
                </Button>
                <Button
                    rightIcon={<MdPlaylistAdd />}
                    color={'white'}
                    backgroundColor={'blue.500'}
                    size={'sm'}
                    onClick={handleOpenCreateModal}
                >
                    Tambah Kaprodi
                </Button>
            </Flex>


            <HeadOfStudyProgramModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                method={method}
                studyProgramId={studyProgramId}
                refetchData={refetchData}
            />
            <DeleteHeadOfStudyProgramModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                dataToBeDeleted={selectedKaprodi}
                refetchData={refetchData}
            />
        </Flex>
    );
};
