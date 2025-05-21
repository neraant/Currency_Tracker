import { ChangeEvent, Component, createRef, ReactNode } from 'react';

import { Modal } from '@components/common/Modal/Modal';

import { ChartFieldName, IChartBar, IChartBarFormData, IFormValidationState } from '@typings/chart';

import { CHART_BAR_FIELDS } from '@constants/Chart';

import { ChartInputsContainer } from './styled';
import ChartInputComponent from '../ChartInput/ChartInputComponent';

interface IChartModalProps {
  isModal: boolean;
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

export class ChartModal extends Component<IChartModalProps, IChartModalState> {
  currencyModalRef = createRef<HTMLDivElement>();

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

  componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps: IChartModalProps) {
    if (this.props.isModal && this.props.defaultValues !== prevProps.defaultValues) {
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

  handleClickOutside = (e: MouseEvent) => {
    if (
      this.props.isModal &&
      this.currencyModalRef.current &&
      !this.currencyModalRef.current.contains(e.target as Node)
    ) {
      this.props.handleCloseModal();
    }
  };

  handleChange = (field: ChartFieldName) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState(
      (prevState) =>
        ({
          [field]: value,
        }) as Pick<IChartModalState, ChartFieldName>
    );
  };

  validateAllFields = (): boolean => {
    const { open, high, low, close } = this.state;
    const openVal = parseFloat(open);
    const highVal = parseFloat(high);
    const lowVal = parseFloat(low);
    const closeVal = parseFloat(close);

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

      this.setState(
        {
          open: '',
          high: '',
          low: '',
          close: '',
          validation: {
            open: true,
            high: true,
            low: true,
            close: true,
            allValid: true,
          },
        },
        () => {
          this.props.handleCloseModal();
        }
      );
    }
  };

  render(): ReactNode {
    const { isModal, handleCloseModal, defaultValues } = this.props;
    const { timestamp } = defaultValues;

    return (
      <Modal isOpen={isModal} onClose={handleCloseModal} onSubmit={this.handleSubmit}>
        <ChartInputsContainer>
          <ChartInputComponent
            key="timestamp"
            label="Date"
            value={timestamp ? new Date(timestamp).toLocaleString() : ''}
            onChange={() => {}}
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
