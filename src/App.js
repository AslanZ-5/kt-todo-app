import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Footer from "./Footer";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";

const FilterArr = (arr, filter) => {
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
export default function App() {
  let genId = 100;
  let timerId = null;
  const [todoData, setTodoData] = useState([
    {
      title: "Completed111 task",
      created: "2022-05-11T12:11:32",
      done: false,
      id: 1,
      timer: 5458,
    },
  ]);
  const [filter, setFilter] = useState("all");
  const [counting, setCounting] = useState(0);

  const onCountDown = useCallback((id) => {
    const inx = todoData.findIndex((item) => item.id === id);
    const item = todoData[inx];
    const newItem = { ...item, timer: item.timer - 1 };
    return setTodoData([
      ...todoData.slice(0, inx),
      newItem,
      ...todoData.slice(inx + 1),
    ]);
  });
  const clearComleted = useCallback(() => {
    const newArr = todoData.filter((item) => !item.done);
    return setTodoData(newArr);
  });
  const onDoneToggle = useCallback((id, e) => {
    e.preventDefault();

    return setTodoData((td) => {
      const inx = td.findIndex((item) => item.id === id);
      const item = td[inx];
      return { ...item, done: !item.done };
    });
  });
  const onDeleteItem = useCallback((id) => {
    const inx = todoData.findIndex((item) => item.id === id);
    return setTodoData([...todoData.slice(0, inx), ...todoData.slice(inx + 1)]);
  });

  const AddItem = useCallback((val, min, sec) => {
    const time = Math.floor(Number(sec) + Number(min) * 60);
    const d = new Date();
    const newItem = {
      title: val,
      created: d.toISOString(),
      done: false,
      id: genId++,
      timer: time,
    };

    return setTodoData([...todoData, newItem]);
  });
  useEffect(() => {
    clearInterval(timerId);
    if (counting) {
      timerId = setInterval(() => {
        onCountDown(counting);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [counting, onCountDown]);

  useEffect(() => {
    const timers = localStorage.getItem("timers");
    const count = Number(localStorage.getItem("counting"));
    setCounting(count);
    if (count) {
      timerId = setInterval(() => onCountDown(count), 1000);
    }
    if (timers) {
      setTodoData(JSON.parse(timers));
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("counting", counting);
      localStorage.setItem("timers", JSON.stringify(todoData));
    });
    return () => {
      clearInterval(timerId);
    };
  }, []);
  const data = FilterArr(todoData, filter);
  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos-timer</h1>
          <NewTaskForm AddItem={AddItem} />
        </header>
        <section className="main">
          <TaskList
            onDoneToggle={onDoneToggle}
            data={data}
            onDeleteItem={onDeleteItem}
            playTimer={(id) => {
              setCounting(id);
            }}
            stopTimer={() => {
              setCounting(0);
            }}
          />
          <Footer
            onFilter={(fl) => setFilter(fl)}
            filter={filter}
            clearComleted={clearComleted}
            data={data}
          />
        </section>
      </section>
    </div>
  );
}
