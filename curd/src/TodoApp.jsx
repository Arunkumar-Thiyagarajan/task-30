import React, { useState } from 'react';
import { Card, Button, Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 



const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (taskName && taskDescription) {
      const newTodo = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        status: 'not completed',
      };
      setTodos([...todos, newTodo]);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const editTodo = (id, updatedName, updatedDescription) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, name: updatedName, description: updatedDescription }
        : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === 'not completed' ? 'completed' : 'not completed' }
        : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'not completed') return todo.status === 'not completed';
    return true;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Todo App</h1>
      <Form>
        <Form.Group>
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </Form.Group>
        <Button variant="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </Form>

      <div className="mt-4">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filter: {filter}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilter('all')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('completed')}>Completed</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('not completed')}>Not Completed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="mt-4">
        {filteredTodos.map((todo) => (
          <Card key={todo.id} className="mb-3">
            <Card.Body>
              <Card.Title>
                {todo.name}
                <Dropdown className="float-end">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {todo.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => toggleStatus(todo.id)}>
                      {todo.status === 'not completed' ? 'Completed' : 'Not Completed'}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Title>
              <Card.Text>{todo.description}</Card.Text>
              <Button variant="warning" onClick={() => editTodo(todo.id, prompt('New name:', todo.name), prompt('New description:', todo.description))}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => deleteTodo(todo.id)} className="ms-2">
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
