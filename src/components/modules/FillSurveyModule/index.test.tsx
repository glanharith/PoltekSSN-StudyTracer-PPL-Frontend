import React from 'react';
import { render, screen, waitFor, fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';
import SurveyForm from '.';
import { useToast } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useToast: jest.fn(),
  }));

describe('Fill Survey Module', () => {
    const refetchData = jest.fn();
    const mockAxios = new MockAdapter(axios);
  
    beforeEach(() => {
      mockAxios.reset();
      (useToast as jest.Mock).mockReturnValue(jest.fn());
      refetchData.mockClear();
    });

    const tempSurvey = {
      "id": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
      "type": "CURRICULUM",
      "title": "test banyak",
      "description": "testt",
      "startTime": "2024-03-26T12:00:00.000Z",
      "endTime": "2024-04-06T12:00:00.000Z",
      "admissionYearFrom": 1961,
      "admissionYearTo": 1962,
      "graduateYearFrom": 1969,
      "graduateYearTo": 1971,
      "questions": [
          {
              "id": "5f4e49f5-1700-4d1f-a0ca-dfc7e121019f",
              "type": "TEXT",
              "question": "INI TEKS",
              "rangeFrom": 1,
              "rangeTo": 3,
              "order": 0,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": []
          },
          {
              "id": "5ca5a5a3-d27c-4b30-ab13-41e1c01d0956",
              "type": "TEXT",
              "question": "INI TEKS 2",
              "rangeFrom": 1,
              "rangeTo": 3,
              "order": 1,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": []
          },
          {
              "id": "23b70fed-cc7c-4368-a2c9-385c8091d94c",
              "type": "CHECKBOX",
              "question": "INI CHECK",
              "rangeFrom": 1,
              "rangeTo": 3,
              "order": 2,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": [
                  {
                      "id": "4d12a37e-c44f-48e0-8df2-f23d929e4a11",
                      "label": "1",
                      "questionId": "23b70fed-cc7c-4368-a2c9-385c8091d94c",
                      "order": 0
                  },
                  {
                      "id": "c67c2a72-cc87-4f90-9bb3-169eec4fbaff",
                      "label": "2",
                      "questionId": "23b70fed-cc7c-4368-a2c9-385c8091d94c",
                      "order": 1
                  }
              ]
          },
          {
              "id": "8acd202e-1dc8-489a-ba69-7ee908fd489a",
              "type": "CHECKBOX",
              "question": "INI CHECK 2",
              "rangeFrom": 1,
              "rangeTo": 3,
              "order": 3,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": [
                  {
                      "id": "a931e4c3-ba07-409f-a126-76f1f0e806f8",
                      "label": "1",
                      "questionId": "8acd202e-1dc8-489a-ba69-7ee908fd489a",
                      "order": 0
                  },
                  {
                      "id": "1e7ea834-6c12-40c3-9e68-2d4c41e2d92c",
                      "label": "2",
                      "questionId": "8acd202e-1dc8-489a-ba69-7ee908fd489a",
                      "order": 1
                  }
              ]
          },
          {
              "id": "c47b8a6a-10f5-41bd-9c09-f86fe5dbad56",
              "type": "RADIO",
              "question": "INI RADIO",
              "rangeFrom": 1,
              "rangeTo": 3,
              "order": 4,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": [
                  {
                      "id": "b7e66f7b-28ef-44ba-8aee-92c80148b718",
                      "label": "1",
                      "questionId": "c47b8a6a-10f5-41bd-9c09-f86fe5dbad56",
                      "order": 0
                  },
                  {
                      "id": "e0d2b907-61ff-42a0-8690-9a48c401705c",
                      "label": "2",
                      "questionId": "c47b8a6a-10f5-41bd-9c09-f86fe5dbad56",
                      "order": 1
                  }
              ]
          },
          {
              "id": "c323518b-c422-4354-8a90-42b69aa36c78",
              "type": "RADIO",
              "question": "INI RADIO 2",
              "rangeFrom": 1,
              "rangeTo": 3,
              "order": 5,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": [
                  {
                      "id": "b7f5ef63-b397-4564-bc81-ef742c6cf553",
                      "label": "1",
                      "questionId": "c323518b-c422-4354-8a90-42b69aa36c78",
                      "order": 0
                  },
                  {
                      "id": "0c14b2bf-1b70-4684-adf1-54d3645f93d1",
                      "label": "2",
                      "questionId": "c323518b-c422-4354-8a90-42b69aa36c78",
                      "order": 1
                  }
              ]
          },
          {
              "id": "6ab99ad9-eb9e-49f8-bc21-448ed8b3e97a",
              "type": "RANGE",
              "question": "qeqw",
              "rangeFrom": 1,
              "rangeTo": 4,
              "order": 6,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": []
          },
          {
              "id": "c43f60f5-f852-4877-bca5-c7e613ff1422",
              "type": "RANGE",
              "question": "qweqw",
              "rangeFrom": 1,
              "rangeTo": 3,
              "order": 7,
              "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
              "option": []
          }
      ]
  }

    it("renders correctly", async () => {
        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(200, tempSurvey);
        await act(async () => {
          render (
            <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6'/>
          )
        });
        await waitFor(() => {
            expect(screen.getByText("Silahkan isi pertanyaan-pertanyaan berikut ini dengan jawaban yang sesuai.")).toBeInTheDocument();
        })
      })


      it("it show toast when id is not valid ", async () => {
        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(400);
        await act(async () => {
          render (
            <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6'/>
          )
        });
        await waitFor(() => {
            expect(useToast()).toHaveBeenCalledWith({
                title: 'Gagal',
                description: 'Gagal memuat daftar kepala program studi',
                status: 'error',
            });
        })
      })

})