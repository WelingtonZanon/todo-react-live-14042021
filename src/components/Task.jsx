export default function Task({ task, deleteTask, editTask }) {
    return (
        <div className="task" onClick={() => editTask(task.id)}>
            <p className="task-title">{task.title}</p>
            <div>
                <button type="button" onClick={(e) => {
                    //evitar que o onclick do imput propague no botão
                    e.stopPropagation();
                    deleteTask(task.id)
                }}>
                    Excluir
            </button>
            </div>
        </div>

    );
}