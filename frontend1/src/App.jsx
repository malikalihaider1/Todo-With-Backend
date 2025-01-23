import { useEffect, useState } from "react";
import icon from "./images/icon.png";
import axios from "axios";

export default function App() {
  const BASE_URL = "http://localhost:5002";

  const [todos, setTodos] = useState([]);

  const getTodo = async () => {
    try {
      const res = await axios(`${BASE_URL}/api/v1/todos`);
      const todosFromServer = res?.data?.data;
      console.log("todosFromServer", todosFromServer);
      setTodos(todosFromServer);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async (event) => {
    event.preventDefault();
    try {
      const todoValue = event.target.children[0].value; // Corrected typo
      const res = await axios.post(`${BASE_URL}/api/v1/todos`, {
        todoContent: todoValue, // Ensure this matches your backend field
      });
      setTodos([...todos, res.data.data]); // Append the new todo to the state
      event.target.reset(); // Clear the input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 p-4 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
          Todo App
          <img src={icon} alt="icon" className="w-8 h-8 ml-3" />
        </h2>

        <form
          onSubmit={addTodo}
          className="flex items-center bg-gray-100 p-2 rounded-full mb-6"
        >
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-grow bg-transparent p-3 focus:outline-none text-gray-700"
          />
          <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition duration-200">
            Add
          </button>
        </form>

        <ul className="space-y-4">
          {todos?.map((todo) => (
            <li
              key={todo._id} // Use a unique key
              className="relative flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              <span
                className="absolute left-3 top-3 h-7 w-7 rounded-full bg-center bg-cover"
                style={{ backgroundImage: "url(images/unchecked.png)" }}
              ></span>
              <span className="ml-12 text-gray-800">{todo.todoContent}</span>
              <div className="absolute right-3 top-2 flex space-x-2">
                <button className="bg-green-400 text-gray-600 px-2 py-1 rounded-full hover:bg-green-500">
                  Edit
                </button>
                <button className="bg-red-400 text-gray-600 px-2 py-1 rounded-full hover:bg-red-500">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
