import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

function NewTaskForm({ AddItem }) {
  const [inputData, setInputData] = useState({
    val: "",
    min: "",
    sec: "",
  });
  const onChangeInput = useCallback((e) => {
    const newInputData = { ...inputData, [e.target.name]: e.target.value };
    setInputData(newInputData);
  });
  const { val, min, sec } = inputData;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        AddItem(val, min, sec);
        setInputData({
          val: "",
          min: "",
          sec: "",
        });
      }}
      className="new-todo-form"
    >
      <input
        value={val}
        name="val"
        onChange={onChangeInput}
        className="new-todo"
        placeholder="What needs to be done?"
      />
      <input
        value={min}
        name="min"
        onChange={onChangeInput}
        className="new-todo-form__timer"
        placeholder="Min"
      />
      <input
        value={sec}
        name="sec"
        onChange={onChangeInput}
        className="new-todo-form__timer"
        placeholder="Sec"
      />
      <input type="submit" hidden />
    </form>
  );
}

export default NewTaskForm;
NewTaskForm.defaultProps = {
  AddItem: () => {},
};
NewTaskForm.propTypes = {
  AddItem: PropTypes.func,
};
