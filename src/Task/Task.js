import React from "react";
import { formatDistance, parseISO } from "date-fns";
import PropTypes from "prop-types";
import timeRender from "../helper/timeRender";

function Task({ data, onDeleteItem, onClickToggle }) {
  const created = formatDistance(parseISO(data.created), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });
  return (
    <div className="view">
      {/* <input className="toggle" type="checkbox" /> */}
      <label onClick={onClickToggle}>
        <span className="title">{data.title}</span>
        <span className="description">
          <button className="icon icon-play" />
          <button className="icon icon-pause" />
          {timeRender(data.timer)}
        </span>
        <span className="created">{created}</span>
      </label>
      <button className="icon icon-edit" />
      <button onClick={onDeleteItem} className="icon icon-destroy" />
    </div>
  );
}
Task.defaultProps = {
  data: { title: "*******", created: "*******" },
  onDeleteItem: () => {},
  onClickToggle: () => {},
};
Task.propTypes = {
  data: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onClickToggle: PropTypes.func,
};
export default Task;
