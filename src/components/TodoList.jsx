import { useState, useEffect } from "react";
import Tasks from "./Task";
import EditTask from "./EditTask";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTask, setEditingTask] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "http://localhost:8080/api/v1/tasks"
                );
                const data = await response.json();

                if (data.length < 1) {
                    setTasks([]);
                } else {
                    setTasks(data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const deleteTask = (id) => {
        fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
            method: "DELETE",
        }).then(() => {
            setTasks(tasks.filter((task) => task.id !== id));
        });
    };

    const editTask = async (taskId, updatedTask) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/v1/tasks/${taskId}`,
                updatedTask
            );
            setTasks(
                tasks.map((task) => (task.id === taskId ? response.data : task))
            );
            setEditingTaskId(null); // Kết thúc chỉnh sửa
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    const showEditForm = (taskId) => {
        setEditingTaskId(taskId);
        setEditingTask(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;

        if (!title) {
            const alert = document.querySelector(".form-alert");
            alert.textContent = "Please enter a task";
            alert.classList.add("alert");
            setTimeout(() => {
                alert.textContent = "";
                alert.classList.remove("alert");
            }, 2000);
            return;
        }

        const newTask = { title, completed: false };

        fetch("http://localhost:8080/api/v1/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => {
                setTasks([...tasks, data]);
            });

        document.getElementById("title").value = "";
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    if (editingTask) {
        return <EditTask taskID={editingTaskId} />;
    }

    if (error) {
        return (
            <div className="error">
                <h5>There was an error, please try later...</h5>
                <p>{error.message}</p>{" "}
                {/* Hiển thị thông báo lỗi chi tiết hơn */}
            </div>
        );
    }

    return (
        <>
            <form className="task-form" id="task-form" onSubmit={handleSubmit}>
                <h4>task manager</h4>
                <div className="form-control">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="task-input"
                        placeholder="e.g. wash dishes"
                    />
                    <button type="submit" className="btn submit-btn">
                        submit
                    </button>
                </div>
                <div className="form-alert"></div>
            </form>
            <Tasks tasks={tasks} onDeleteTask={deleteTask} onShowEditForm={showEditForm} />
        </>
    );
}

export default TodoList;
