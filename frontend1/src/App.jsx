import { useEffect, useState } from "react";
import icon from "./images/icon.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function App() {
  const BASE_URL = "http://localhost:5002";

  const [todos, setTodos] = useState([]);
  console.log("todo", todos);
  


  const getTodo = async () => {
    try {
      const res = await axios(`${BASE_URL}/api/v1/todos`);
      const todosFromServer = res?.data?.data;
      console.log("todosFromServer", todosFromServer);

      // const newnew = todosFromServer.map((todo)=>{
      //   return {...todo, isEditing: false  }
      // })
      setTodos(todosFromServer);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || "unknown errorrrrrrr");
    }
  };


  useEffect(() => {
    getTodo();
  }, []);



 const addTodo = async (event) => {
    try {
      event.preventDefault();

      const todoValue = event.target.children[0].value;

      await axios.post(`${BASE_URL}/api/v1/todo`, {
        todo: todoValue,
      });
      getTodo();

      event.target.reset();
    } catch (err) {
      toast.dismiss()
      toast.error(err?.response?.data?.message || "unknown errorrr");
    }
  };


 const editTodo = async (event, todoId) => {
    try {
      event.preventDefault();

      const todoValue = event.target.children[0].value;

      await axios.patch(`${BASE_URL}/api/v1/todo/${todoId}`, {
        todoContent: todoValue,
      });
      getTodo();

      event.target.reset();
    } catch (err) {
      toast.dismiss()
      toast.error(err?.response?.data?.message || "unknown errorrr");
    }
  };


  const deleteTodo = async (todoId) => {
    try {
      console.log("todoId", todoId);
      const res = await axios.delete(`${BASE_URL}/api/v1/todo/${todoId}`);
      console.log("data", res.data);
      toast(res?.data?.message);
      getTodo();
    } catch (err) {
      console.log("err a raha ha", err);
      toast.error(err?.response?.data?.message || "unknown error");
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
        {!todos?.length && "todo nh hy"}

        {/* todo list */}
        <ul className="space-y-4">
          {todos?.map((todo, index) => (
            <li
              key={todo.id}
              className="relative flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              <span
                className="absolute left-3 top-3 h-7 w-7 rounded-full bg-center bg-cover"
                style={{ backgroundImage: "url(images/unchecked.png)" }}
              ></span>
              {!todo.isEditing ? (
                <span className="ml-12 text-gray-800">{todo.todoContent}</span>
              ) : (
                <form
                onSubmit={(e)=>editTodo(e,todo.id)}
                >

                <input
                  type="text"
                  defaultValue={todo.todoContent}
                  className="border border-gray-400"
                  />
                  <button
                    onClick={() => {
                      const newTodos = todos.map((todo, i) => {
                        todo.isEditing = false;
                        return todo;
                      });
                      setTodos([...newTodos]);
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button type="submit">Save</button>
                 </form>
              )}
              <div className="absolute right-3 top-2 flex space-x-2">
                {!todo.isEditing ? (
                  <button
                    onClick={() => {
                      const newTodos = todos.map((todo, i) => {
                        if (i === index) {
                          todo.isEditing = true;
                        } else {
                          todo.isEditing = false;
                        }
                        return todo;
                      });
                      // todos[index].isEditing = true
                      setTodos([...newTodos]);
                    }}
                    className="bg-green-400 text-gray-600 px-2 py-1 rounded-full hover:bg-green-500"
                  >
                    Edit
                  </button>
                ) : null}
                {!todo.isEditing ? (
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-400 text-gray-600 px-2 py-1 rounded-full hover:bg-red-500"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
