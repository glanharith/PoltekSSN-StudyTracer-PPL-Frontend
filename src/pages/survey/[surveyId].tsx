// pages/survey.tsx
import React from 'react';
import { Survey } from '@/components/modules/FillSurveyModule/interface';
import { useRouter } from 'next/router';
import SurveyForm from '@/components/modules/FillSurveyModule';
import AlumniHoc from '@/components/hoc/alumniHoc';


const FillSurvey =  () => {

    const survey : Survey = {
        "id": "8abf188d-2e08-4010-8e17-92fa97a6e4f2",
        "type": "CURRICULUM",
        "title": "JUDUL SURVEY",
        "description": "DESKRIPSI SURVEY",
        "startTime": "2024-03-25T15:24:00.000Z",
        "endTime": "2024-03-29T15:24:00.000Z",
        "questions": [
            {
                "id": "5a2ae682-d420-451f-a5e2-8d6f2947c50c",
                "type": "TEXT",
                "question": "INI TEKS",
                "rangeFrom": 1,
                "rangeTo": 3,
                "order": 0,
                "formId": "8abf188d-2e08-4010-8e17-92fa97a6e4f2",
                "option": []
            },
            {
                "id": "7f324de3-045c-49b7-bc35-073ded862b2a",
                "type": "CHECKBOX",
                "question": "INI CHECKBOX",
                "rangeFrom": 1,
                "rangeTo": 3,
                "order": 1,
                "formId": "8abf188d-2e08-4010-8e17-92fa97a6e4f2",
                "option": [
                    {
                        "id": "70c93d40-92c3-4c5c-99f2-116f0cfa4b32",
                        "label": "1",
                        "questionId": "7f324de3-045c-49b7-bc35-073ded862b2a",
                        "order": 0
                    },
                    {
                        "id": "83348005-53ce-4cfe-b1c8-b1fbcf83a382",
                        "label": "2",
                        "questionId": "7f324de3-045c-49b7-bc35-073ded862b2a",
                        "order": 1
                    }
                ]
            },
            {
                "id": "b48e4647-5811-40f8-b046-8499b3371e0e",
                "type": "RADIO",
                "question": "INI RADIO",
                "rangeFrom": 1,
                "rangeTo": 3,
                "order": 2,
                "formId": "8abf188d-2e08-4010-8e17-92fa97a6e4f2",
                "option": [
                    {
                        "id": "78e8e1fb-ed45-4e6a-af0c-83d973300cbc",
                        "label": "1",
                        "questionId": "b48e4647-5811-40f8-b046-8499b3371e0e",
                        "order": 0
                    },
                    {
                        "id": "4d197746-0248-4b10-975b-41a8aadb84c6",
                        "label": "2",
                        "questionId": "b48e4647-5811-40f8-b046-8499b3371e0e",
                        "order": 1
                    }
                ]
            },
            {
                "id": "e16d8860-8f30-4805-9b40-3d21bb789917",
                "type": "RANGE",
                "question": "INI SKALA",
                "rangeFrom": 1,
                "rangeTo": 5,
                "order": 3,
                "formId": "8abf188d-2e08-4010-8e17-92fa97a6e4f2",
                "option": []
            }
        ]
    }

    const router = useRouter();
    const { surveyType } = router.query;

    return <SurveyForm survey={survey} />;
};

export default AlumniHoc(FillSurvey)