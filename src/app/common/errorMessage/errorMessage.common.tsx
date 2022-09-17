interface ErrorMessageProps {
  errorValue: string;
}

export const ErrorMessage = ({ errorValue }: ErrorMessageProps) => (
  <p
    style={{
      color: "red",
    }}
  >
    {errorValue}
  </p>
);
