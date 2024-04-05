import React from 'react';
import { render, screen, waitFor, fireEvent, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import SurveyForm from '.';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useToast: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Fill Survey Module', () => {
    const refetchData = jest.fn();
    const mockAxios = new MockAdapter(axios);

    beforeEach(() => {
        mockAxios.reset();
        (useToast as jest.Mock).mockReturnValue(jest.fn());
        (useRouter as jest.Mock).mockReturnValue({
            replace: jest.fn()
        })
        refetchData.mockClear();
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
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
                "options": []
            },
            {
                "id": "23b70fed-cc7c-4368-a2c9-385c8091d94c",
                "type": "CHECKBOX",
                "question": "INI CHECK",
                "rangeFrom": 1,
                "rangeTo": 3,
                "order": 2,
                "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
                "options": [
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
                "id": "c47b8a6a-10f5-41bd-9c09-f86fe5dbad56",
                "type": "RADIO",
                "question": "INI RADIO",
                "rangeFrom": 1,
                "rangeTo": 3,
                "order": 4,
                "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
                "options": [
                    {
                        "id": "b7e66f7b-28ef-44ba-8aee-92c80148b718",
                        "label": "ini jawaban radio",
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
                "id": "6ab99ad9-eb9e-49f8-bc21-448ed8b3e97a",
                "type": "RANGE",
                "question": "qeqw",
                "rangeFrom": 1,
                "rangeTo": 4,
                "order": 6,
                "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
                "options": []
            },
        ]
    }

    it("renders correctly", async () => {
        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(200, tempSurvey);
        await act(async () => {
            render (
              <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='FILL'/>
            )
        });
        await waitFor(() => {
            expect(screen.getByText("Silahkan isi pertanyaan-pertanyaan berikut ini dengan jawaban yang sesuai.")).toBeInTheDocument();
        })
    })

    it("no survey with the id", async () => {
        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(400, {
            message: 'Survey not found',
        });
        await act(async () => {
            render (
              <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='FILL'/>
            )
        });
        await waitFor(() => {
            expect(useRouter().replace).toHaveBeenCalledWith('/');
        })
    })

    it("it show toast when id is not valid ", async () => {
        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(400, {
            message: 'Gagal memuat data survey',
        });
        await act(async () => {
            render (
              <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='FILL'/>
            )
        });
        await waitFor(() => {
            expect(useToast()).toHaveBeenCalledWith({
                title: 'Gagal',
                description: 'Gagal memuat data survey',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            expect(useRouter().replace).toHaveBeenCalledWith('/');
        })
    })

    it("click submit but some fill are blank", async () => {
        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(200, tempSurvey);
        await act(async () => {
            render (
              <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='FILL'/>
            )
        });

        await waitFor(() => expect(screen.getByText("ini jawaban radio")).toBeInTheDocument());

        fireEvent.click(screen.getByText("ini jawaban radio"))
        fireEvent.click(screen.getByText("Submit"))


        await waitFor(() => {
            expect(useToast()).toHaveBeenCalledWith({
                title: 'Warning',
                description: 'Harap isi semua pertanyaan yang ada',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        })
    })

    it("click submit and success", async () => {

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
                    "id": "c47b8a6a-10f5-41bd-9c09-f86fe5dbad56",
                    "type": "RADIO",
                    "question": "INI RADIO",
                    "rangeFrom": 1,
                    "rangeTo": 3,
                    "order": 0,
                    "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
                    "options": [
                        {
                            "id": "b7e66f7b-28ef-44ba-8aee-92c80148b718",
                            "label": "ini jawaban radio",
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
                }
            ]
        }

        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(200, tempSurvey);
        await act(async () => {
            render (
              <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='FILL'/>
            )
        });
        mockAxios.onPost('/survey/fill-survey').reply(200)

        await waitFor(() => expect(screen.getByText("ini jawaban radio")).toBeInTheDocument());

        fireEvent.click(screen.getByText("ini jawaban radio"))
        fireEvent.click(screen.getByText("Submit"))

        await waitFor(() => {
            expect(useToast()).toHaveBeenCalledWith({
                title: 'Sukses',
                description: 'Sukses mengisi survey',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        })

    })

    it("click submit and post failed", async () => {

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
                    "id": "c47b8a6a-10f5-41bd-9c09-f86fe5dbad56",
                    "type": "RADIO",
                    "question": "INI RADIO",
                    "rangeFrom": 1,
                    "rangeTo": 3,
                    "order": 0,
                    "formId": "7b44a640-4f8c-4bd8-8137-42723f8c90d6",
                    "options": [
                        {
                            "id": "b7e66f7b-28ef-44ba-8aee-92c80148b718",
                            "label": "ini jawaban radio",
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
                }
            ]
        }

        mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(200, tempSurvey);
        await act(async () => {
            render (
              <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='FILL'/>
            )
        });
        mockAxios.onPost('/survey/fill-survey').reply(400 , {
            message: "Survey gagal diisi"
        })

        await waitFor(() => expect(screen.getByText("ini jawaban radio")).toBeInTheDocument());

        fireEvent.click(screen.getByText("ini jawaban radio"))
        fireEvent.click(screen.getByText("Submit"))

        await waitFor(() => {
            expect(useToast()).toHaveBeenCalledWith({
                title: 'Error',
                description: 'Survey gagal diisi',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        })

    })

    describe('Preview Option', () => {
        it("renders correctly", async () => {
            mockAxios.onGet('/survey/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(200, tempSurvey);
            await act(async () => {
                render (
                  <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='PREVIEW'/>
                )
            });
            await waitFor(() => {
                expect(screen.getByText('Pratinjau Survei'))
                expect(screen.getByText("Silahkan isi pertanyaan-pertanyaan berikut ini dengan jawaban yang sesuai.")).toBeInTheDocument();
                expect(screen.getByText(/1\s*\.\s*INI\s*TEKS/i))
                expect(screen.getByText(tempSurvey.questions[2].options[0].label))
                expect(screen.queryByText("Submit")).not.toBeInTheDocument();
            })
        })

        it('no survey with the ID', async () => {
            mockAxios.onGet('/survey/get/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(400, {
                message: 'Survey not found',
            });
            await act(async () => {
                render (
                  <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='PREVIEW'/>
                )
            });
            await waitFor(() => {
                expect(useRouter().replace).toHaveBeenCalledWith('/');
            })
        })

        it('try to submit while on preview mode', async () => {
            mockAxios.onGet('/survey/7b44a640-4f8c-4bd8-8137-42723f8c90d6').reply(200, tempSurvey);
            await act(async () => {
                render (
                  <SurveyForm surveyId='7b44a640-4f8c-4bd8-8137-42723f8c90d6' type='PREVIEW'/>
                )
            });

            await waitFor(() => {
                expect(screen.getByText('Pratinjau Survei'))
                expect(screen.queryByText("Submit")).not.toBeInTheDocument();
            })

            fireEvent.click(screen.getByText("ini jawaban radio"))
            fireEvent.submit(screen.getByRole('form'));

            await waitFor(() => {
                expect(useToast()).toHaveBeenCalledWith({
                    title: 'Gagal',
                    description: 'Preview tidak bisa melakukan penyimpanan survey',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            })
        })
    });
})