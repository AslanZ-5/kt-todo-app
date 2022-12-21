import React from "react";
import PropTypes from "prop-types";

function TasksFilter({ fl, filter, onFilter }) {
  return (
    <button onClick={onFilter} className={filter === fl.name ? "selected" : ""}>
      {fl.label}
    </button>
  );
}
TasksFilter.defaultProps = {
  fl: {},
  filter: "",
  onFilter: () => {},
};
TasksFilter.propTypes = {
  fl: PropTypes.object,
  filter: PropTypes.string,
  onFilter: PropTypes.func,
};
export default TasksFilter;
