import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ taskID }) => {
    const [task, setTask] = useState([]);
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    console.log(taskID);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/tasks/${taskID}`)
            .then((response) => response.json())
            .then((data) => {
                setTask(data);
                setTitle(data.title);
                setCompleted(data.completed);
            });
    }, [taskID]);

    console.log(completed);

    const editTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/v1/tasks/${taskID}`,
                {
                    title,
                    completed,
                }
            );
            setMessage("Task updated successfully");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            setError(true);
            console.error("Error editing task:", error);
        }
    };

    return (
        <div className="container">
            <form className="single-task-form" onSubmit={editTask}>
                <h4>Edit Task</h4>
                <div className="form-control">
                    <label>Task ID</label>
                    <p className="task-edit-id">{task.id}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="task-edit-name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="completed">completed</label>
                    <input
                        type="checkbox"
                        name="completed"
                        className="task-edit-completed"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                </div>
                <button type="submit" className="block btn task-edit-btn">
                    edit
                </button>
                <div
                    className={`form-alert ${
                        error ? "" : "text-success"
                    }`}
                >
                    {message}
                </div>
            </form>
            <a href="/" className="btn back-link">
                back to tasks
            </a>
        </div>
    );
};

export default EditTask;
