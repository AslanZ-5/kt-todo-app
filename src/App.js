import "./App.css";
import React, { Component } from "react";
import Footer from "./Footer";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";

export default class App extends Component {
  genId = 100;

  state = {
    todoData: [
      {
        title: "Completed task",
        created: "2022-05-11T12:11:32",
        done: false,
        id: 1,
      },
      {
        title: "Editing task",
        created: "2021-11-11T04:32:33",
        done: false,
        id: 2,
      },
      {
        title: "Active task",
        created: "2020-12-11T01:20:10",
        done: false,
        id: 3,
      },
    ],
    filter: "all",
  };

  onFilter = (filter) =>
    this.setState({
      filter,
    });

  clearComleted = () => {
    const { todoData } = this.state;
    const newArr = todoData.filter((item) => !item.done);
    return this.setState({
      todoData: newArr,
    });
  };

  onDoneToggle = (id) => {
    const { todoData } = this.state;
    const inx = todoData.findIndex((item) => item.id === id);
    const item = todoData[inx];
    const newItem = { ...item, done: !item.done };
    return this.setState({
      todoData: [
        ...todoData.slice(0, inx),
        newItem,
        ...todoData.slice(inx + 1),
      ],
    });
  };

  onDeleteItem = (id) => {
    const { todoData } = this.state;
    const inx = todoData.findIndex((item) => item.id === id);
    return this.setState({
      todoData: [...todoData.slice(0, inx), ...todoData.slice(inx + 1)],
    });
  };

  AddItem = (val) => {
    const { todoData } = this.state;
    const d = new Date();
    const newItem = {
      title: val,
      created: d.toISOString(),
      done: false,
      id: this.genId++,
    };

    return this.setState({
      todoData: [...todoData, newItem],
    });
  };

  FilterArr = (arr, filter) => {
    switch (filter) {
      case "all":
        return arr;
      case "active":
        return arr.filter((item) => !item.done);
      case "completed":
        return arr.filter((item) => item.done);
      default:
        return arr;
    }
  };

  render() {
    const { todoData, filter } = this.state;
    const data = this.FilterArr(todoData, filter);

    return (
      <div className="App">
        <section className="todoapp">
          <header className="header">
            <h1>todos-timer</h1>
            <NewTaskForm AddItem={this.AddItem} />
          </header>
          <section className="main">
            <TaskList
              onDoneToggle={this.onDoneToggle}
              data={data}
              onDeleteItem={this.onDeleteItem}
            />
            <Footer
              onFilter={this.onFilter}
              filter={filter}
              clearComleted={this.clearComleted}
              data={data}
            />
          </section>
        </section>
      </div>
    );
  }
}
