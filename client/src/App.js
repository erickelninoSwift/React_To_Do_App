import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react";
const App = () => {
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos");
      const dataFetched = await response.json();
      setTodos(() => dataFetched.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(todos);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <ListHeader listName={"Holiday Tick list"} />
    </div>
  );
};

export default App;
