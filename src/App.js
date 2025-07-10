import logo from './logo.svg';
import './App.css';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name){
    const newTasks = { id: `todo-${nanoid()}`, name, completed: false }
    setTasks([...tasks, newTasks]);
    console.log(tasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
}


  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(updatedTasks);
}


  const taskList = tasks?.map((task) => (
  <Todo 
    id = {task.id}
    name = {task.name} 
    completed = {task.completed} 
    key = {task.id} 
    toggleTaskCompleted = {toggleTaskCompleted}
    deleteTask = {deleteTask}
  />
));
  
  const taskNoun = taskList.length != 1 ? "tasks" : "task";
  const headingTest = `${taskList.length} ${taskNoun} remaining`;
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit = {addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton filterName = "all"/>
        <FilterButton filterName = "active"/>
        <FilterButton filterName = "completed"/>
      </div>
      <h2 id="list-heading">{headingTest}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
       {taskList}
      </ul>
    </div>
  );
}

