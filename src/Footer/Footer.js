import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter";

function Footer({ filter, onFilter, clearComleted, data }) {
  const buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];
  const filterItems = buttons.map((item) => (
    <li key={item.name} className="active">
      <TasksFilter
        onFilter={() => onFilter(item.name)}
        filter={filter}
        fl={item}
      />
    </li>
  ));

  const ItemsLeft = data.filter((item) => !item.done).length;
  return (
    <footer className="footer">
      <span className="todo-count">{ItemsLeft} items left</span>
      <ul className="filters">{filterItems}</ul>
      <button type="button" onClick={clearComleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  onFilter: () => {},
  clearComleted: () => {},
  filter: "all",
  data: [],
};
Footer.propTypes = {
  data: PropTypes.array,
  onFilter: PropTypes.func,
  filter: PropTypes.string,
  clearComleted: PropTypes.func,
};
export default Footer;
