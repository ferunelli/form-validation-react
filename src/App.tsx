/* eslint-disable no-control-regex */
import React, { useState } from "react";
import Form from "./Form";
import InputElem from "./InputElem";

const App = () => {
  const [inputs, setInputs] = useState({
    name: { hasError: false, message: "" },
    email: { hasError: false, message: "" },
    number: { hasError: false, message: "" },
  });

  const validation = {
    name: {
      validate: (value: string) => Boolean(value.match(/^[a-zA-Z]+$/)),
      errorMessage: "Поле может содержать только буквы латинского алфавита",
    },
    email: {
      validate: (value: string) =>
        Boolean(
          value.match(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
          )
        ),
      errorMessage: "Введенный email некорректный",
    },
    number: {
      validate: (value: string) => Boolean(value.match(/^[+-]?\d*(\.\d*)?$/)),
      errorMessage: "Здесь может быть только число",
    },
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const handleErrors = (name: string, message: string, hasError: boolean) => {
    setInputs((prev) => ({
      ...prev,
      [name]: { message, hasError },
    }));
  };

  return (
    <div className="App">
      <Form
        validation={validation}
        onSubmit={onSubmit}
        handleErrors={handleErrors}
      >
        <InputElem error={inputs.name} label={"Введите имя: "} name="name" />
        <InputElem
          error={inputs.number}
          label={"Введите число: "}
          name="number"
        />
        <InputElem label={"Введите Фамилию: "} name="surname" />
        <InputElem
          error={inputs.email}
          label={"Введите email: "}
          name="email"
        />
        <button type="submit">Сохранить</button>
      </Form>
    </div>
  );
};

export default App;
