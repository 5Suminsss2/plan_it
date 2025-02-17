# Planit

## 프로젝트 소개

업무 일정을 한눈에 파악하고 체계적으로 관리할 수 있는 서비스입니다.
직관적인 시각화와 효율적인 기록 관리 기능을 통해 사용자가 업무를 보다 효과적으로 계획하고 실행할 수 있도록 돕습니다.

## 시작 가이드

### Requirements

- [Node.js 20.15.1](https://nodejs.org/ca/blog/release/v20.15.1/)
- [Npm 10.7.0](https://www.npmjs.com/package/npm/v/10.7.0)

### Installation

```bash
$ git clone https://github.com/5Suminsss2/plan_it.git
```

#### Backend

```
$ cd planit_backend
$ yarn install
$ yarn start
```

- 테스트 : postman 실행

#### Frontend

```
$ cd palnit
$ yarn install
$ yarn start
```

### Electron

```
$ cd palnit
$ yarn build
$ dist 폴더 > index.html > js, css 파일 경로 앞 부분에 ./ 붙이기
$ yarn run electron
```

## Stacks

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=Electron&logoColor=white)

---

## 주요 기능

### 카테고리 별 일정 관리 기능

- 사용자가 필요한 카테고리를 직접 등록하여 카테고리 별로 일정을 관리할 수 있는 기능 제공
- 카테고리 등록 시 색깔 커스텀 기능 제공

### 일정 등록 기능

- 당일 일정 등록 및 삭제 기능 제공
- 각 일정 별 진행상태에 따른 분류 기능 제공
- (예정) 끝내지 못한 일정 관리 기능 제공
- (예정) 일정 루틴 등록 기능 제공

---

## 아키텍쳐

### 디렉토리 구조

```bash
├── README.md
└── planit : 프론트엔드
│   ├── electron : electron 개발 폴더
    ├── README.md
    ├── components : 화면을 구성하는 UI 요소 정의
    │   ├── modals : 모달 관련 component
    │   └── todo : todo 관련 component
    ├── containers : UI 요소와 상태 로직을 연결
    │   ├── PreTodoModalContainer.tsx : 끝내지 못한 todo modal 관련 container
    │   ├── TodoContainer.tsx : todo 관련 container
    │   └── TodoTopicModalContainer.tsx : 토픽(카테고리) 생성 모달 관련 container
    ├── pages
    │   └── Home.tsx : 메인 홈 페이지
    ├── store
    ├── types : 타입 설정 관련 폴더
    ├── package.json
    └── App.tsx
├── planit_backend : 백엔드
│   ├── db : db 관련 정보 폴더
│   │   └── mongo.ts
│   ├── models : 모델 관련 폴더
│   │   └── Todo.ts : todo 모델 관련 정보
│   ├── routes : routes 관련 폴더
│   │   └── todo.ts : todo routes 관련 정보
│   └── index.ts
```
