import { useState } from 'react';

interface TodoAdd {
  addTodo: FunctionStringCallback;
}

function AddTodo({ addTodo }: TodoAdd) {
  const [todo, setTodo] = useState<string>('');

  return (
    <>
      <div className='addTodoContainer'>
        <input
          className='todoInputText'
          type='text'
          placeholder='Add new todo here...'
          id='todoText'
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              addTodo(todo);
              setTodo('');
            }
          }}
        />

        <input
          className='todoInputButton'
          type='button'
          value='Add'
          onClick={() => {
            addTodo(todo);
            setTodo('');
          }}
        />
      </div>
    </>
  );
}

export default AddTodo;
