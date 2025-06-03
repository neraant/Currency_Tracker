import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Popup } from '@components/common/Popup/Popup';
import ContactsForm from '@components/ContactsPage/ContactsForm/ContactsForm';
import { ContactsInfo } from '@components/ContactsPage/ContactsInfo/ContactsInfo';
import { ContactsInput } from '@components/ContactsPage/ContactsInput/ContactsInput';
import { CONTACT_FIELDS } from '@constants/contacts';
import { useSubject } from '@context/ObserverConext';
import { RegisterInterface } from '@typings/contacts';
import { schema } from '@utils/schema';
import { ContactContainer } from './styled';

export const ContactWrapper = () => {
  const subject = useSubject('notification');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(schema),
  });

  const values = watch();

  const submitForm = () => {
    const successMsg = 'Success! Your message was sent!';

    subject.setState({
      isPopup: true,
      message: successMsg,
    });

    reset();
  };

  const onError = () => {
    subject.setState({
      isPopup: true,
      message: 'Failed to sent form!',
    });
  };

  return (
    <ContactContainer>
      <ContactsInfo />

      <ContactsForm onSubmit={handleSubmit(submitForm, onError)}>
        {CONTACT_FIELDS.map((field) => (
          <ContactsInput
            key={field}
            label={field}
            error={errors[field]?.message}
            value={values[field]}
            {...register(field)}
          />
        ))}
      </ContactsForm>

      <Popup
        isError={!isSubmitSuccessful}
        onPopupClose={() => subject.setState({ isPopup: false, message: '' })}
      />
    </ContactContainer>
  );
};
