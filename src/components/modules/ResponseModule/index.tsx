import React, { useState, useEffect } from 'react';
import { SurveyResponseProps } from './interface';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import SurveyResponseDataPreview from '@/components/elements/SurveyResponseDataPreview';
import SurveyResponseByAlumni from '@/components/elements/SurveyResponseByAlumni';

const ResponseModule: React.FC<SurveyResponseProps> = ({ surveyId, role }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Tabs isFitted>
        <TabList>
          <Tab fontWeight={'bold'}>Ringkasan</Tab>
          <Tab fontWeight={'bold'}>Individual</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SurveyResponseDataPreview surveyId={surveyId}/>
          </TabPanel>
          <TabPanel>
            <SurveyResponseByAlumni surveyId={surveyId} role={role} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ResponseModule;
