// 다른 todo 관련 타입들 추가 가능

// 각 todo의 타입
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

//- TodoBox 컴포넌츠 props 타입
export interface TodoBoxProps {
  currentDate: string;
  handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleNewSubmit: (value: string) => void;
  handleRemoveTodo: (id: string) => void;
  handleCompleteTodo: (id: string) => void;
  todoList: Todo[];
  newTodo: string;
}

//- TodoLists 컴포넌츠 props 타입
export interface TodoListsProps {
  todoList: Todo[];
  handleRemoveTodo: (id: string) => void;
  handleCompleteTodo: (id: string) => void;
}
