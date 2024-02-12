import { useEffect, useState } from "react";
import TaskModel from "../../../models/task.model";
import HttpService from "../../../services/httpService";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from '../editTaskComp/editor.module.css'


export default function NewTask(props) {
  const httpService = new HttpService();
  const [task, setTask] = useState(new TaskModel());
  const [isInputValid, setIsInputValid] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const newTask = { ...task, [name]: value };
    setTask(newTask);
  };
  const newTaskHandler = () => {
    httpService.post(task).then((res) => {
      navigate("/");
    });
  };

  useEffect(() => {
    const isValid = validateInputs();
    setIsInputValid(isValid);
    // console.log(task);
  }, [task]);

  const validateInputs = () => {
    const isValid =
      task.title !== "" &&
      task.subTitle !== "" &&
      task.image !== "" &&
      task.description !== "";

    return isValid;
  };
  return (
    <div className={style.container} >
      {/* <div className={style.exit} onClick={()=>{navigate('/')}}>X</div> */}
      <div className={style.main}>
        <h1>New Task</h1>
        Title: <input type="text" name="title" onChange={onChangeHandler} />
        Sub Title:{" "}
        <input type="text" name="subTitle" onChange={onChangeHandler} />
        Description:{" "}
        <input type="text" name="description" onChange={onChangeHandler} />
        Image URL: <input type="text" name="image" onChange={onChangeHandler} />
        <button onClick={() => newTaskHandler()} disabled={!isInputValid}>
          ADD
        </button>
      </div>
    </div>
  );
}
