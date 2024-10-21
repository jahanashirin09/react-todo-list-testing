/* eslint-disable react/prop-types */

import "./ListComponent.css";
export default function ListComponent({
  tasks,
  handledelete,
  handleEdit,
  handleComplete,
}) {
  return (
    <div>
      {tasks.map((task) => (
        <div className="overViewContainer" key={task.id}>
          <li className="list-item">
            <input
              type="text"
              value={task.title}
              className={`text-task${task.completed ? "completed" : ""}`}
              onChange={(event) => event.preventDefault()}
            ></input>
            <div className="list-btn">
              <button className="delete-btn" onClick={() => handledelete(task)}>
                Delete
              </button>
              <button className="move-up" onClick={() => handleComplete(task)}>
                {/* <i className="fa-solid fa-circle-check"></i> */}complete
              </button>
              <button className="move-down" onClick={() => handleEdit(task)}>
                {/* <i className="fa-solid fa-pen-to-square"></i> */}edit
              </button>
            </div>
          </li>
        </div>
      ))}
    </div>
  );
}
