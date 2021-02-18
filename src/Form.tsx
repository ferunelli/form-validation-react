/* eslint-disable no-empty-pattern */
/* eslint-disable no-new-object */
import React from "react";

interface IFormProps {
  children: React.ReactNode;
  validation?: {
    [key: string]: {
      validate: (value: string) => Boolean;
      errorMessage: string;
    };
  };
  onSubmit?: ({}: { [key: string]: string }) => void;
  handleErrors?: (name: string, msg: string, error: boolean) => void;
}

const Form = (props: IFormProps) => {
  const { children, onSubmit, validation, handleErrors } = props;

  const formInputsValues = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data: { [key: string]: string } = {};

    for (let pair of formData.entries()) {
      const [name, value] = pair;
      if (typeof value === "string") data[name.toString()] = value.toString();
    }

    return data;
  };

  const validate = (event: any) => {
    event.preventDefault();
    const inputValues = formInputsValues(event);
    if (event.type === "input") {
      const name = event.target.name;
      const value = inputValues[name];
      if (validation && name in validation) {
        if (!validation[name].validate(value)) {
          handleErrors &&
            handleErrors(name, validation[name].errorMessage, true);
          return false;
        }
        handleErrors &&
          handleErrors(name, validation[name].errorMessage, false);
      }
    } else {
      let hasError = false;
      for (let key in inputValues) {
        if (validation && key in validation) {
          if (!validation[key].validate(inputValues[key])) {
            handleErrors &&
              handleErrors(key, validation[key].errorMessage, true);
            hasError = true;
          }
        }
      }
      return !hasError;
    }
    return true;
  };

  return (
    <form
      onSubmit={(event) => {
        const validated = validation ? validate(event) : true;
        if (onSubmit && validated) onSubmit(formInputsValues(event));
      }}
      onInput={validate}
    >
      {children}
    </form>
  );
};

export default Form;
