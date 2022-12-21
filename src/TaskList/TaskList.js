import React from "react";
import PropTypes from "prop-types";
import Task from "../Task";

function TaskList({ data, onDoneToggle, onDeleteItem }) {
  const tasks = data.map((task) => {
    const activeClass = task.done ? "completed" : "";
    return (
      <li key={task.id} className={activeClass}>
        <Task
          onDeleteItem={() => onDeleteItem(task.id)}
          onDoneToggle={() => onDoneToggle(task.id)}
          data={task}
        />
      </li>
    );
  });
  return <ul className="todo-list">{tasks}</ul>;
}
TaskList.defaultProps = {
  onDeleteItem: () => {},
  onDoneToggle: () => {},
  data: [],
};
TaskList.propTypes = {
  data: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onDoneToggle: PropTypes.func,
};
export default TaskList;
