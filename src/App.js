import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'
import Task from "./components/Task";

function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState("");

  //carregando itens do local storage na execução
  useEffect(() => {
    const localTasks = localStorage.getItem("@tasks");
    if (!!localTasks) {
      setTasks(JSON.parse(localTasks));
    }
  }, [])


  function addTask() {
    const newTask = {

      //usando a biblioteca uuid para gerar a key unica
      id: uuid(),
      title: taskTitle,
    };

    if (taskTitle) {
      const tasksCopy = [...tasks];
      tasksCopy.push(newTask);
      setTasks(tasksCopy);

      //limpa tasks caso haja, e depois salva na referencia @tasks o array de tasks
      localStorage.removeItem("@tasks");
      localStorage.setItem('@tasks', JSON.stringify(tasksCopy));
      setTaskTitle("");
    }
  }

  function editTask(id) {
    /*filtra os tasks, recuperando o task onde task.id for igual ao id do argumento
     *por retornar uma array setamos em 0 q é o primeiro e na verdade o único retorno
    **/
    const toEdit = tasks.filter((task) => task.id === id)[0];
    setTaskTitle(toEdit.title);
    setEditingId(toEdit.id);
    setEdit(true);
  }

  function saveUpdatedTask() {
    const newTasks = tasks.filter((task) => task.id !== editingId);
    newTasks.unshift({ id: editingId, title: taskTitle });
    setTasks(newTasks);
    localStorage.removeItem("@tasks");
    localStorage.setItem('@tasks', JSON.stringify(newTasks));
    setEdit(false);
    setTaskTitle("");
    setEditingId("");
  }

  function deleteTask(id) {
    //pego todos os itens do array menos o que veio pelo argumento
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.removeItem("@tasks");
    localStorage.setItem('@tasks', JSON.stringify(filteredTasks));
  }

  return (
    <div className="app">
      <div className="form">
        <input
          type="text"
          placeholder="Digite a tarefa..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button type="button" onClick={edit ? saveUpdatedTask : addTask}>
          {edit ? "Atualizar" : "Salvar"}
        </button>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <Task task={task} deleteTask={deleteTask} editTask={editTask} key={task.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
