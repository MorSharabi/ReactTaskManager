import { useNavigate } from "react-router-dom";
import style from "../editTaskComp/editor.module.css";

export default function Settings(props) {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.main}>
        <button
          onClick={() => {
            props.onChange();
            navigate("/");
          }}
        >
          Swicth Theme
        </button>
      </div>
    </div>
  );
}
