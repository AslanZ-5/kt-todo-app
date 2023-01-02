import React from "react";
import PropTypes from "prop-types";
import Task from "../Task";

function TaskList({ data, onDoneToggle, onDeleteItem, playTimer, stopTimer }) {
  const tasks = data.map((task) => {
    const activeClass = task.done ? "completed" : "";
    return (
      <li key={task.id} className={activeClass}>
        <Task
          onDeleteItem={() => onDeleteItem(task.id)}
          onClickToggle={(e) => {
            if (e.target.classList[1] === "icon-pause") {
              stopTimer();
            } else if (e.target.classList[1] === "icon-play") {
              playTimer(task.id);
            } else {
              onDoneToggle(task.id, e);
            }
          }}
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
  playTimer: () => {},
  stopTimer: () => {},
  data: [],
};
TaskList.propTypes = {
  data: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onDoneToggle: PropTypes.func,
  playTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};
export default TaskList;
