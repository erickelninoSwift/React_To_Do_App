import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react";
import ListItems from "./components/ListItems";
import Auth from "./components/Auhtentication/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.authtoken;
  const [todos, setTodos] = useState([]);
  const [userEmail, setUserEmail] = useState(cookies.email_user);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${userEmail}`);
      const dataFetched = await response.json();
      setTodos(() => dataFetched.data);
    } catch (error) {
      console.log("failed to fetch");
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);
  const sortedTask = todos
    ? todos.sort((a, b) => new Date(a.data) - new Date(b.data))
    : [];

  return (
    <div className="app">
      {authToken && (
        <>
          <ListHeader listName={"Holiday Tick list"} getAlldata={getData} />
          {sortedTask?.map((data) => {
            return <ListItems key={data.id} task={data} getAlldata={getData} />;
          })}
        </>
      )}
      {!authToken && <Auth />}
    </div>
  );
};

export default App;
