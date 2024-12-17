export const todoStateName = {
  preTodo: "pre",
  inProgressTodo: "inProgress",
  completedTodo: "completed",
};

export const todoStates = [
  { value: "", label: "실행상태", disabled: true },
  { value: todoStateName.preTodo, label: "실행 전" },
  { value: todoStateName.inProgressTodo, label: "진행 중" },
  { value: todoStateName.completedTodo, label: "완료" },
];
