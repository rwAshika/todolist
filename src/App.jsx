import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDelete,MdDownloadDone } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: "added",
      completed: false
    },
  ]);

  const [editByIndex, setEditByIndex] = useState(-1);


  const setEdit = (index) => {
    setTodo(todos[index].todo);
    setEditByIndex(index);
  };

  // Add todo
  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: new Date().getTime(), todo: todo }]);
      setTodo("");
    }
    console.log("item Called");
  };
  console.log(todos);

  // Update todo
  const updateTodo = () => {
    if (todo.trim() !== "") {
      const updatedTodos = [...todos];
      updatedTodos[editByIndex].todo = todo;
      setTodos(updatedTodos);
      setTodo("");
      setEditByIndex(-1);
    }
    console.log("update Called");
  };
 

  
  //complete
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  //delete
  const deleteTodo = (id) => {
    let filterTodos = todos.filter((todo) => todo.id !== id);
    console.log(filterTodos);
    setTodos(filterTodos);
  };

  return (
    <div className="min-h-screen w-full gap-4 flex flex-col items-center justify-center bg-gradient-to-br from-amber-500 to-amber-800">
      <div className="font-bold rounded-md bg-gray-100 w-full lg:w-1/4 max-w-lg p-6 shadow-md">
        <h1 className="text-center p-2 text-3xl">TODO LIST</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            value={todo}
            placeholder="Add to list"
            className="rounded shadow-md outline-none px-3 py-2 text-center w-full text-lg"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            className="shadow bg-gradient-to-r from-cyan-500 to-blue-500 border rounded py-2 px-3"
            onClick={editByIndex >= 0 ? updateTodo : addTodo}
          >
            {editByIndex >= 0 ? <MdEdit /> : <IoMdAdd />}
          </button>
        </div>
      </div>

      {todos.length > 0 && (
        <div className="bg-gray-100 rounded-md w-full lg:w-1/4 max-w-lg p-6 shadow-md">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`flex flex-row items-center justify-between mb-3 p-3 shadow-md rounded bg-white ${
                  todo.completed ? "bg-blue-100" : ""
                }`}
                
              >
                <span className={`text-lg ${todo.completed ? "line-through" : ""}`}>{todo.todo}</span>

                <div className="space-x-3">
                <button
                    className="border px-3 py-2 rounded shadow bg-gradient-to-r from-yellow-500 to-amber-600 font-semibold text-white"
                    onClick={() => toggleComplete(index)}
                  >
                   <MdDownloadDone/>
                  </button>
                  <button
                    className="border px-3 py-2 rounded shadow bg-gradient-to-r from-green-600 to-lime-800 font-semibold text-white"
                    onClick={() => setEdit(index)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="border px-3 py-2 rounded shadow bg-gradient-to-r from-red-600 to-rose-800 font-semibold text-white"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
