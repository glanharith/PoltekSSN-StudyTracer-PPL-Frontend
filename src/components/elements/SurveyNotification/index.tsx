import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
    Table, 
    Tbody,
    Tr, 
    Td,} from '@chakra-ui/react';
import { axios } from '@/utils';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle,FaExclamationTriangle } from 'react-icons/fa';
import { NotificationModalProps } from './interface';
import { Survey } from '@/components/elements/SurveyNotification/interface';


  export default function SurveyNotificationModal({
    isOpen,
    onClose,
  }: Readonly<NotificationModalProps>) {
    const [filledSurvey, setFilledSurvey] = useState<Survey[]>([]);
    const [unfilledSurvey, setUnfilledSurvey] = useState<Survey[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchNotification = async () => {
        const result = await axios.get('/notification');
        setFilledSurvey(result.data.data.filledSurveys);
        setUnfilledSurvey(result.data.data.unfilledSurveys)
    };  
  
    useEffect(() => {
        if (isOpen) {
          setIsModalOpen(true);
          fetchNotification();
        } else {
          setIsModalOpen(false); 
        }
      }, [isOpen]);

    return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius={48} p={8} maxW="50%"> {/* Atur ukuran maksimum modal menjadi 80% */}
            <ModalHeader textAlign="center" textColor="blue.900" fontSize="3xl">
            Notifications
            </ModalHeader>
            <ModalCloseButton p={6} borderRadius={32} />

            <ModalBody maxH="60vh" overflowY="auto"> {/* Atur tinggi maksimum dan aktifkan scrolling */}
            <Table variant="simple">
                <Tbody> 
                {(filledSurvey.map((data) => (                    
                    <Tr key={data.id}>

                    <Td bg="green.100">
                        <FaCheckCircle style={{ fontSize: '1rem', verticalAlign: 'middle' }} />
                    </Td>
                    <Td colSpan={5} fontSize="sm">
                        Anda sudah mengisi survey <strong>{data.title}</strong>, Terima kasih atas kontribusinya!
                    </Td>
                    </Tr>
                )))}
                {(unfilledSurvey.map((data) => (
                    <Tr key={data.id}>
                    <Td bg="yellow.100">
                        <FaExclamationTriangle/>
                    </Td>
                    <Td colSpan={5} fontSize="sm">
                        Jangan lupa untuk mengisi survey <strong>{data.title}</strong>, survey expire di tanggal <strong>{data.endTime.slice(8, 10) + '/' + data.endTime.slice(5, 7) + '/' + data.endTime.slice(0, 4)}</strong> pukul <strong>{data.endTime.slice(11,16)}</strong>
                    </Td>
                    </Tr>
                )))}
                </Tbody>
            </Table>
            </ModalBody>

            <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={onClose}>
                Close
            </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
      );
    }
  