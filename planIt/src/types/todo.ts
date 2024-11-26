// 다른 todo 관련 타입들 추가 가능

// 각 todo의 타입
export interface Todo {
  id: string;
  title: string;
  state: string;
}

// Question) TodoBoxProps와 TodoListsProps가 겹치는 타입이 많은데 하나로 정리할 수 있는 방법은 없을까? extends로 고려했는데 그렇게 되면 TodoBox가 더 큰 범위인데 종속되는게 말이 되지 않는 것 같기도 함..
// Solved) 공통 타입 정의
interface TodoHandlers {
  handleRemoveTodo: (id: string) => void;
  handleCompleteTodo: (id: string, state: string) => void;
  todoList: Todo[];
}

//- TodoBoxProps 타입
export interface TodoBoxProps extends TodoHandlers {
  currentDate: string;
  handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleNewSubmit: (value: string) => void;
  handleShowModal: (modalId: string, isOpen: boolean) => void;
  newTodo: string;
  modals: Record<string, boolean>;
}

//- TodoListsProps 타입
// export interface TodoListsProps extends TodoHandlers {}
// 빈 객체로 두면 타입 안전성 상실이 있을 수 있어 우선 이렇게 정의
export type TodoListsProps = TodoHandlers;
