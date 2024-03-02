import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ContentSection } from "./sections";
import { StudyProgram } from "./interface";

export const ProdiModule = () => {

  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

  const fetchStudyPrograms = async () => {
    try {
      
    } catch (error) {

    }
  };

  const refetchData = () => {
  }

  return (
      <Flex className="min-h-screen" px={{ base: 4, md: 16 }} gap={4} flexDirection={'column'} justifyItems="center" padding={4}>
          <ContentSection refetchData={refetchData} studyProgram={studyPrograms} />
      </Flex>
  )
}