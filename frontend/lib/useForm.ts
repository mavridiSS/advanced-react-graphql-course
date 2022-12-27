import React from "react";

export default function useForm(data = {}) {
  const [inputs, setInputs] = React.useState(data);
  const values = Object.values(data).join();

  React.useEffect(() => {
    setInputs(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (e) => {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => setInputs(data);

  const clearForm = () => {
    const blank = Object.entries(inputs).map(([key, value]) => [key, ""]);
    setInputs(Object.fromEntries(blank));
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
