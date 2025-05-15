import { ErrorText } from './styled';

interface ErrorFallbackProps {
  errorMessage?: string | null;
}

export const ErrorFallback = ({ errorMessage }: ErrorFallbackProps) => {
  return (
    <ErrorText>
      {errorMessage ? (
        errorMessage
      ) : (
        <>
          Ooops, something went wrong. <span>Reload</span> the page or
          <span> try again later</span>:)
        </>
      )}
    </ErrorText>
  );
};
