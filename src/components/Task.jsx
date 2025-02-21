const Tasks = ({tasks, onDeleteTask, onShowEditForm}) => {
    return (
        <section className="tasks-container">
            <div className="tasks">
                {tasks.length < 1 ? (
                    <h5 className="empty-list">No tasks in your list</h5>
                ) : (
                    tasks.map((task) => {
                        const { completed, id, title } = task;
                        return (
                            <div
                                key={id}
                                className={`single-task ${
                                    completed ? "task-completed" : ""
                                }`}
                            >
                                <h5>
                                    <span>
                                        <i className="far fa-check-circle"></i>
                                    </span>
                                    {title}
                                </h5>
                                <div className="task-links">
                                    <button
                                        type="button"
                                        className="edit-link"
                                        onClick={() => onShowEditForm(id)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-btn"
                                        data-id={id}
                                        onClick={() => onDeleteTask(id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default Tasks;
