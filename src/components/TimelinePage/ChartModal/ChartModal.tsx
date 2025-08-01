import { ChangeEvent, PureComponent, ReactNode } from 'react';
import { Modal } from '@components/common/Modal/Modal';
import { CHART_BAR_FIELDS, INITIAL_BAR_STATE } from '@constants/chart';
import { ChartFieldName, IChartBar, IChartBarFormData, IFormValidationState } from '@typings/chart';
import { formatTimestamp } from '@utils/formatTimestamp';
import { isValidAmount } from '@utils/isValidAmount';
import { parseToFloat } from '@utils/parseToFloat';
import { ChartInputsContainer } from './styled';
import ChartInputComponent from '../ChartInput/ChartInputComponent';

interface IChartModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  onSubmit: (data: IChartBarFormData) => void;
  defaultValues: IChartBar;
}

interface IChartModalState {
  open: string;
  high: string;
  low: string;
  close: string;
  validation: IFormValidationState;
}

export class ChartModal extends PureComponent<IChartModalProps, IChartModalState> {
  constructor(props: IChartModalProps) {
    super(props);

    const { open = '', high = '', low = '', close = '' } = props.defaultValues;

    this.state = {
      open: open.toString(),
      high: high.toString(),
      low: low.toString(),
      close: close.toString(),
      validation: {
        open: true,
        high: true,
        low: true,
        close: true,
        allValid: true,
      },
    };
  }

  componentDidUpdate(prevProps: IChartModalProps) {
    if (this.props.isOpenModal && this.props.defaultValues !== prevProps.defaultValues) {
      const { open = '', high = '', low = '', close = '' } = this.props.defaultValues;

      this.setState({
        open: open.toString(),
        high: high.toString(),
        low: low.toString(),
        close: close.toString(),
        validation: {
          open: true,
          high: true,
          low: true,
          close: true,
          allValid: true,
        },
      });
    }
  }

  handleChange = (field: ChartFieldName) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const isValueValid = isValidAmount(value);

    if (isValueValid) {
      this.setState(
        (prevState) =>
          ({
            [field]: value,
          }) as Pick<IChartModalState, ChartFieldName>
      );
    }
  };

  validateAllFields = (): boolean => {
    const { open, high, low, close } = this.state;
    const [openVal, highVal, lowVal, closeVal] = parseToFloat([open, high, low, close]);

    const isOpenValid = !isNaN(openVal);
    const isHighValid = !isNaN(highVal);
    const isLowValid = !isNaN(lowVal);
    const isCloseValid = !isNaN(closeVal);

    const isAllValid = isOpenValid && isHighValid && isLowValid && isCloseValid;

    const validations: IFormValidationState = {
      open: isOpenValid,
      high: isHighValid,
      low: isLowValid,
      close: isCloseValid,
      allValid: false,
    };

    if (isAllValid) {
      if (highVal < Math.max(openVal, lowVal, closeVal)) {
        validations.high = false;
      }

      if (lowVal > Math.min(openVal, highVal, closeVal)) {
        validations.low = false;
      }
    }

    validations.allValid =
      validations.open && validations.high && validations.low && validations.close;

    this.setState({ validation: validations });

    return validations.allValid;
  };

  handleSubmit = () => {
    const { open, high, low, close } = this.state;
    const time = this.props.defaultValues.timestamp;

    if (this.validateAllFields() && time) {
      this.props.onSubmit({
        open: +open,
        high: +high,
        low: +low,
        close: +close,
        time,
      });

      this.setState(INITIAL_BAR_STATE, () => {
        this.props.handleCloseModal();
      });
    }
  };

  modalClose = () => {
    this.setState(INITIAL_BAR_STATE, () => {
      this.props.handleCloseModal();
    });
  };

  render(): ReactNode {
    const { isOpenModal, defaultValues } = this.props;
    const { timestamp } = defaultValues;

    return (
      <Modal
        title="Edit bar"
        isOpen={isOpenModal}
        onClose={this.modalClose}
        onSubmit={this.handleSubmit}
        buttonText="Edit bar"
      >
        <ChartInputsContainer>
          <ChartInputComponent
            key="timestamp"
            label="Date"
            value={formatTimestamp(timestamp)}
            disabled
          />

          {CHART_BAR_FIELDS.map(({ name, label }) => {
            const fieldName = name as ChartFieldName;

            return (
              <ChartInputComponent
                key={fieldName}
                label={label}
                value={this.state[fieldName]}
                onChange={this.handleChange(fieldName)}
                isValid={this.state.validation[fieldName]}
                disabled={false}
              />
            );
          })}
        </ChartInputsContainer>
      </Modal>
    );
  }
}
