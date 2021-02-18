import React from "react";

interface IInputElemProps {
  label?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: { hasError: Boolean; message: string };
}

const InputElem = (props: IInputElemProps) => {
  const { label, name, onChange, error } = props;

  return (
    <div>
      {label && <label>{label}</label>}
      <input type="text" name={name} onChange={onChange} />
      {error?.hasError && <span>&nbsp;{error?.message}</span>}
    </div>
  );
};

export default InputElem;
