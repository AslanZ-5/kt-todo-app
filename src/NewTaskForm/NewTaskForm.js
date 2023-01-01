import React, { useState } from "react";
import PropTypes from "prop-types";

function NewTaskForm({ AddItem }) {
  const [val, setVal] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        AddItem(val);
        setVal("");
      }}
      className="new-todo-form"
    >
      <input
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
        className="new-todo"
        placeholder="What needs to be done?"
      />
      <input className="new-todo-form__timer" placeholder="Min" />
      <input className="new-todo-form__timer" placeholder="Sec" />
    </form>
  );
}
NewTaskForm.defaultProps = {
  AddItem: () => {},
};
NewTaskForm.propTypes = {
  AddItem: PropTypes.func,
};
export default NewTaskForm;
