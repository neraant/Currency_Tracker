import { fireEvent, render, screen } from '@testing-library/react';
import { ChartModal } from './ChartModal';

const defaultValues = {
  close: 1,
  high: 1,
  low: 1,
  open: 1,
  time: 1,
  timestamp: 1,
};

describe('ChartModal', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  test('isOpenModal work correctly', () => {
    render(
      <ChartModal
        isOpenModal={true}
        handleCloseModal={jest.fn()}
        onSubmit={jest.fn()}
        defaultValues={defaultValues}
      />
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('close modal on cross click', () => {
    const handleCloseModalMock = jest.fn();

    render(
      <ChartModal
        isOpenModal={true}
        handleCloseModal={handleCloseModalMock}
        onSubmit={jest.fn()}
        defaultValues={defaultValues}
      />
    );

    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);

    expect(handleCloseModalMock).toHaveBeenCalled();
  });

  test('calls onSubmit with correct data when all fields are valid', () => {
    const onSubmitMock = jest.fn();
    const handleCloseMock = jest.fn();

    render(
      <ChartModal
        isOpenModal={true}
        handleCloseModal={handleCloseMock}
        onSubmit={onSubmitMock}
        defaultValues={defaultValues}
      />
    );

    fireEvent.click(screen.getByTestId('modal-submit-button'));

    expect(onSubmitMock).toHaveBeenCalledWith({
      close: 1,
      high: 1,
      low: 1,
      open: 1,
      time: 1,
    });

    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('calls onSubmit with invalid data', () => {
    const handleCloseModalMock = jest.fn();
    const onSubmitMock = jest.fn();

    render(
      <ChartModal
        isOpenModal={true}
        handleCloseModal={handleCloseModalMock}
        onSubmit={onSubmitMock}
        defaultValues={defaultValues}
      />
    );

    fireEvent.change(screen.getByLabelText('Open'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('High'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Low'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Close'), { target: { value: '2' } });

    fireEvent.click(screen.getByTestId('modal-submit-button'));

    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
