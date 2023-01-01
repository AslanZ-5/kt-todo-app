import React, { Component } from "react";
import PropTypes from "prop-types";

class NewTaskForm extends Component {
  state = {
    val: "",
    min: "",
    sec: "",
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { val, min, sec } = this.state;
    const { AddItem } = this.props;
    return (
      <form
        onSubmit={(e) => {
          console.log("sumbin");
          e.preventDefault();

          AddItem(val, min, sec);
          this.setState({
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
          onChange={this.onChangeInput}
          className="new-todo"
          placeholder="What needs to be done?"
        />
        <input
          value={min}
          name="min"
          onChange={this.onChangeInput}
          className="new-todo-form__timer"
          placeholder="Min"
        />
        <input
          value={sec}
          name="sec"
          onChange={this.onChangeInput}
          className="new-todo-form__timer"
          placeholder="Sec"
        />
        <input type="submit" hidden />
      </form>
    );
  }
}

export default NewTaskForm;
NewTaskForm.defaultProps = {
  AddItem: () => {},
};
NewTaskForm.propTypes = {
  AddItem: PropTypes.func,
};
