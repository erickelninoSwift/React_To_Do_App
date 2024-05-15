import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react";
import ListItems from "./components/ListItems";
import Modal from "./components/Modal";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [userEmail, setUserEmail] = useState("erick@yahoo.com");
  const [taskSorted, setTaskSorted] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${userEmail}`);
      const dataFetched = await response.json();
      setTodos(() => dataFetched.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(todos);
  useEffect(() => {
    getData();
  }, []);
  const sortedTask = todos
    ? todos.sort((a, b) => new Date(a.data) - new Date(b.data))
    : [];

  console.log(sortedTask);
  return (
    <div className="app">
      <ListHeader listName={"Holiday Tick list"} />
      {sortedTask?.map((data) => {
        return <ListItems key={data.id} task={data} />;
      })}
    </div>
  );
};

export default App;
