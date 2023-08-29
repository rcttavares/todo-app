'use client';

import { ADDMUT, DELETEMUT, GETQUERY, UPDATEMUT } from '@/query/schema';
import { useEffect, useState } from 'react';

import AddTodo from '@/containers/AddTodo';
import TodoList from '@/containers/TodoList';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

export default function Page() {
  const [todos, setTodos] = useState<[]>([]);
  const [createTodo] = useMutation(ADDMUT);
  const [updateTodo] = useMutation(UPDATEMUT);
  const [deleteMUT] = useMutation(DELETEMUT);
  const { data } = useQuery(GETQUERY, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setTodos(data?.todos?.data);
  }, [data]);

  const addTodo = async (todoText: string) => {
    await createTodo({
      variables: {
        todoText: todoText,
      },
    }).then(({ data }: any) => {
      setTodos([...todos, data?.createTodo?.data] as any);
    });
  };

  const editTodoItem = async (todo: any) => {
    const newTodoText = prompt('Enter new todo text or description:');
    if (newTodoText != null) {
      await updateTodo({
        variables: {
          id: todo.id,
          todoText: newTodoText,
        },
      }).then(({ data }: any) => {
        const moddedTodos: any = todos.map((_todo: any) => {
          if (_todo.id === todo.id) {
            return data?.updateTodo?.data;
          } else {
            return _todo;
          }
        });
        setTodos(moddedTodos);
      });
    }
  };

  const deleteTodoItem = async (todo: any) => {
    if (confirm('Do you really want to delete this item?')) {
      await deleteMUT({
        variables: {
          id: todo.id,
        },
      }).then(({ data }: any) => {
        const newTodos = todos.filter((_todo: any) => _todo.id !== todo.id);
        setTodos(newTodos as any);
      });
    }
  };

  return (
    <div>
      <main className='main'>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}
