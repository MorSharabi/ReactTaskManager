import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskModel from "../../../models/task.model";
import HttpService from "../../../services/httpService";
import style from './editor.module.css'

export default function EditTask(props) {
  const httpService = new HttpService();
  const params = useParams();
  const [task, setTask] = useState(new TaskModel());
  const [isInputValid, setIsInputValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    httpService.getById(params.id).then((response) => {
      setTask(response.data);
    });
  }, [params.id]);

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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const newTask = { ...task, [name]: value };
    setTask(newTask);
  };
  const updateTaskHandler = () => {
    httpService.put(task).then((response) => {
      navigate("/");
    });
  };
  return (
    <div className={style.container} >
      <div className={style.exit} onClick={()=>{navigate('/')}}>X</div>
      <div className={style.main}>
        <h1>EDITOR</h1>
        Title:{" "}
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={onChangeHandler}
        />
        Sub Title:{" "}
        <input
          type="text"
          name="subTitle"
          value={task.subTitle}
          onChange={onChangeHandler}
        />
        Description:{" "}
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={onChangeHandler}
        />
        Image URL:{" "}
        <input
          type="text"
          name="image"
          value={task.image}
          onChange={onChangeHandler}
        />
        <button onClick={() => updateTaskHandler()} disabled={!isInputValid}>
          SAVE
        </button>
      </div>
    </div>
  );
}
