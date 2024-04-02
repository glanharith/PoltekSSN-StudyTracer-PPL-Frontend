import MockAdapter from "axios-mock-adapter";
import { render, screen } from "@testing-library/react";
import { axios } from '@/utils';
import { useToast } from "@chakra-ui/react";
import SurveyNotificationModal from "../SurveyNotification";

jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useToast: jest.fn(),
}));

describe('SurveyNotificationModal',()=>{
    const mockAxios = new MockAdapter(axios);
    const mockOnClose = jest.fn();

    beforeEach(() => {
        mockAxios.reset();
        mockOnClose.mockClear();
        (useToast as jest.Mock).mockClear();
        (useToast as jest.Mock).mockReturnValue(jest.fn());
    });

    afterEach(() => {
        mockAxios.restore();
    });

    test('renders filled survey notifications correctly', async () => {
        const filledSurveys = [{
            id: 1,
            title: "Survey 1",
            // Add other necessary properties
        }];

        mockAxios.onGet('/notification').reply(200, {
            data: {
                filledSurveys: filledSurveys,
                unfilledSurveys: [],
            },
        });

        render(<SurveyNotificationModal isOpen={true} onClose={mockOnClose} />);

        const filledSurveyNotification = await screen.findByText(/Anda sudah mengisi survey/i);
        expect(filledSurveyNotification).toBeInTheDocument();
    });

    test('renders unfilled survey notifications correctly', async () => {
        const unfilledSurveys = [{
            id: 1,
            title: "Survey 2",
            // Add other necessary properties
        }];

        mockAxios.onGet('/notification').reply(200, {
            data: {
                filledSurveys: [],
                unfilledSurveys: unfilledSurveys,
            },
        });

        render(<SurveyNotificationModal isOpen={true} onClose={mockOnClose} />);

        const unfilledSurveyNotification = await screen.findByText(/Jangan lupa untuk mengisi survey/i);
        expect(unfilledSurveyNotification).toBeInTheDocument();
    });

});
