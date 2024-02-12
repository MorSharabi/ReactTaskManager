import { useEffect, useState } from "react";
import HttpService from "../../../services/httpService";
import { Link } from "react-router-dom";
import style from "./tasksLIst.module.css";

export default function TasksList() {
  const [list, setList] = useState([]);
  const httpService = new HttpService();

  useEffect(() => {
    httpService.get().then((res) => {
      setList(res.data);
    });
  }, []);

  const onDeleteHandler = (id) => {
    httpService.delete(id).then((res) => {
      const upList = list.filter((item) => item.id !== id);
      setList(upList);
    });
  };
  const onDoneHandler = (id) => {
    const index = list.findIndex((item) => item.id === id);
    const doneTask = { ...list[index] };
    doneTask.isDone = !doneTask.isDone;
    httpService.put(doneTask).then((res) => {
      setList((prevList) => {
        return prevList.map((task) =>
          task.id === res.data.id ? res.data : task
        );
      });
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <Link className={style.navLink} to={"/set"}>
        Settings
      </Link>
      <Link className={style.navLink} to={"/new"}>
        New Task
      </Link>

      {list.map((task) => (
        <div
          key={task.id}
          className={style.task}
          style={{ opacity: task.isDone ? 0.3 : 1 }}
        >
          <div className={style.content}>
            <div>
              <h2>{task.title}</h2>
              <h3>{task.subTitle}</h3>
              <h4>{task.description}</h4>
              <p style={{ color: task.isDone ? "green" : "red" }}>
                Task is {task.isDone ? "Done" : "Not Done"}
              </p>
            </div>
            <img src={task.image} alt="task" width={300}></img>
          </div>
          <div className={style.btn}>
            <button onClick={() => onDoneHandler(task.id)}>
              {task.isDone ? "unDone" : "Done"}
            </button>
            <Link className={style.link} to={`/edit/${task.id}`}>
              Edit
            </Link>
            <button
              className={style.delete}
              onClick={() => onDeleteHandler(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
