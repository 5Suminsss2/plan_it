import { Todo } from "./todo";

export interface Topic {
  _id: string;
  title: string;
  color: string;
}

export interface TodoTopicModalContainerProps {
  handleShowModal: (modalId: string, isOpen: boolean) => void;
}

export interface TodoTopicModalProps extends TodoTopicModalContainerProps {
  handleTopicSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleTopicTitle: (value: string) => void;
  handleRemoveTopic: (id: string) => void;
  topicTitle: string;
  topicList: Topic[];
  topicColor: string;
  setTopicColor: (value: string) => void;
}

export interface PreTodosModalProps extends TodoTopicModalContainerProps {
  preTodos: Todo[];
  topicList: Topic[];
  checkedItems: Todo[];
  allChecked: boolean;
  toggleCheck: (item: Todo) => void;
  toggleAll: () => void;
  handleApplyPreTodos: (todos: Todo[]) => void;
}

export interface ModalHeaderProps extends TodoTopicModalContainerProps {
  title: string;
  modalId: string;
}
