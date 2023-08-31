import { useState, useEffect, useCallback } from "react";
import axios from "axios";
//import "./App.css";

const siteAPI = "https://todolist-api.hexschool.io";
//建立元件SignUp
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const signUp = async () => {
    try {
      const res = await axios.post(`${siteAPI}/users/sign_up`, {
        email,
        password,
        nickname,
      });
      setMessage("sign up successful! UID:" + res.data.uid);
      console.log(res.data);
    } catch (error) {
      setMessage("sign up failed:" + error.message);
    }
  };
  return (
    <>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="nickname"
      />
      <button type="submit" onClick={signUp}>
        Sign Up
      </button>
      <p>{message}</p>
    </>
  );
}

//建立元件SignIn
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const signIn = async () => {
    try {
      const res = await axios.post(`${siteAPI}/users/sign_in`, {
        email: email,
        password: password,
      });
      console.log(res.data.token);
      //const { token } = res.data;
      //寫入cookies存檔
      //document.cookie = `token=${token}`;
      setToken(res.data.token);
    } catch (error) {
      setToken("sign in Failed:" + error.message);
    }
  };

  return (
    <>
      <h2>Sign In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="button" onClick={signIn}>
        Sign In
      </button>
      <p>Token:{token}</p>
    </>
  );
}

//建立元件verify/checkOut
function Verify({ token, setToken }) {
  const [message, setMessage] = useState("");

  const verified = async () => {
    // 將 Token 儲存，到期日為明天
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);
    //將token存在cookies內
    document.cookie = `hexschoolTodo=${token}; expires=${expireDate.toUTCString()}`;
    console.log(
      document.cookie.split("; ").find((row) => row.startsWith("hexschoolTodo"))
    );
    try {
      const res = await axios.get(`${siteAPI}/users/checkout`, {
        headers: {
          Authorization: token,
        },
      });
      setMessage("Verify successful! UID:" + res.data.uid);
    } catch (error) {
      setMessage("Verify Failed:" + error.message);
    }
  };

  return (
    <>
      <h2>verify</h2>
      <input
        type="text"
        onChange={(e) => setToken(e.target.value)}
        placeholder="Token"
        value={token}
      />
      <button type="submit" onClick={verified}>
        verify
      </button>
      <p>{message}</p>
    </>
  );
}
//建立元件SignOut
function SignOut() {
  const [token, setToken] = useState("");

  const signOut = async () => {
    try {
      const res = await axios.post(
        `${siteAPI}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      setToken("Sign out Failed:" + error.message);
    }
  };

  return (
    <>
      <div>
        <h2>登出</h2>
        <input
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
          }}
          placeholder="Token"
        />
        <button onClick={signOut}>Sign Out</button>
      </div>
    </>
  );
}

//建立元件TodoList
const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState({});

  useEffect(() => {
    getTodos();
  }, []);
  //取得清單
  const getTodos = async () => {
    const res = await axios.get(`${siteAPI}/todos/`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res.data.data);
    setTodos(res.data.data);
  };

  //建立清單
  const addTodo = async () => {
    if (!newTodo) return;
    const todo = {
      content: newTodo,
    };
    await axios.post(`${siteAPI}/todos`, todo, {
      headers: {
        Authorization: token,
      },
    });
    setNewTodo("");
    getTodos();
  };

  //刪除清單
  const deleteTodo = async (id) => {
    const res = await axios.delete(`${siteAPI}/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
  };

  //updateTodo更新
  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.content = todoEdit[id];
    const res = await axios.put(`${siteAPI}/todos/${id}`, todo, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
    setTodoEdit({
      ...todoEdit,
      [id]: "",
    });
  };
  //建立切換狀態toggleStatus元件
  const toggleStatus = async (id) => {
    await axios.patch(
      `${siteAPI}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    getTodos();
  };
  return (
    <>
      <div>
        <input
          value={newTodo}
          placeholder="New Todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="button" onClick={addTodo}>
          Add Todo
        </button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.content}
              {todo.status ? "Done" : "UnFinush"} | {todoEdit[todo.id]}
              <input
                type="text"
                placeholder="update"
                onChange={(e) => {
                  const newTodoEdit = {
                    ...todoEdit,
                  };
                  newTodoEdit[todo.id] = e.target.value;
                  setTodoEdit(newTodoEdit);
                }}
              />
              <button type="button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button type="button" onClick={() => updateTodo(todo.id)}>
                Update
              </button>
              <button type="button" onClick={() => toggleStatus(todo.id)}>
                Toggle Status
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
  //結束＿＿建立元件TodoList
};

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");
  const TodoToken = document.cookie
    .split(";")
    .find((row) => row.startsWith("hexschoolTodo="))
    ?.split("=")[1];
  useEffect(() => {
    if (TodoToken) {
      setToken(TodoToken);
    }
  }, []);
  return (
    <>
      <SignUp />
      <SignIn />
      <Verify setToken={setToken} token={token} />
      <SignOut />
      <hr />
      <h2>Todo list</h2>
      {token && <TodoList token={token} />}
    </>
  );
}

export default App;
