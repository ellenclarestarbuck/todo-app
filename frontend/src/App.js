import { Routes, Route } from "react-router-dom";
import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ToDoList />} />
      <Route path="/new-todo" element={<AddToDo />} />
    </Routes>
  );
}

export default App;
