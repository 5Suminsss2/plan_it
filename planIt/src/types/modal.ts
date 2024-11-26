export interface Topic {
  id: string;
  title: string;
  color: string;
}

export interface TodoTopicModalContainerProps {
  handleShowModal: (modalId: string, isOpen: boolean) => void;
}

export interface TodoTopicModalProps extends TodoTopicModalContainerProps {
  handleTopicSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleNewTopicSubmit: (value: string) => void;
  handleRemoveTopic: (id: string) => void;
  newTopic: string;
  topicList: Topic[];
}
