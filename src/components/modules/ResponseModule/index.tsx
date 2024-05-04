import React, { useState, useEffect } from 'react';
import { SurveyResponseProps } from './interface';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

const ResponseModule: React.FC<SurveyResponseProps> = ({ surveyId, role }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Tabs isFitted>
        <TabList>
          <Tab fontWeight={'bold'}>Ringkasan</Tab>
          <Tab fontWeight={'bold'}>Individual</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{/* Survey Response by Question Component */}</TabPanel>
          <TabPanel>{/* Survey Response by Alumni Component */}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ResponseModule;
