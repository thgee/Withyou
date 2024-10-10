# 🤵🏻 위듀 - AI 면접 서비스

- 배포 URL : https://port-0-withyou-2aat2cluv583d7.sel5.cloudtype.app
- 1인 개발 프로젝트

<br>

## 🌴 프로젝트 소개

- 위듀는 면접을 앞둔 사용자들을 위한 면접 시뮬레이션 서비스 입니다.
- 뻔한 질문 리스트에 국한된 기존의 면접준비와 달리, 위듀는 AI가 다양한 질문을 제공하여 예상치 못한 상황까지 대비할 수 있습니다.
- 3가지 모드를 통해 사용자의 취향에 맞는 면접을 진행할 수 있습니다.

<br>

## 🌴 개발 환경

- Front-end : React, Typescript
- Back-end : Express
- Design : [Figma](https://www.figma.com/file/EPpRjWpOTOKjYJbaESgl70/WEB-design?type=design&node-id=0-1&mode=design&t=pc0a6v0u5ReykWKT-0)
- 버전 및 이슈관리 : Github, Github Issues
- 서비스 배포 환경 : Cloudtype

  <br>








## 🌴 페이지별 기능

### [홈 화면]

- 사용자가 원하는 면접 모드를 선택할 수 있는 화면입니다.
- 모드를 선택하면 이름, 직무 입력란이 나타납니다.
- 컴포넌트가 PC환경에서는 좌우로, Mobile환경에서는 위아래로 펼쳐지는 애니메이션을 구현하였습니다.

| 홈 화면 - PC|홈 화면 - Mobile|
| -------------|-----------------|
| <img src = "https://github.com/thgee/Withyou/assets/102576089/17ea2a96-62b8-4671-b19e-95c025ad9602" width = "500px"/> | <img src = "https://github.com/thgee/Withyou/assets/102576089/386a13e6-5616-453b-a9e0-f88730e0c43a" width = "250px"/> |


<br>

### [면접 화면]

- 사용자가 입력한 이름과 직무를 바탕으로 면접이 진행됩니다.
- 면접 중간에 모드를 변경해도 이름과 직무가 유지되도록 구현하였습니다.
- 면접화면 마운트 시 애니메이션을 구현하였습니다.

| 면접화면 - PC|면접 화면 - Mobile|
| -------------|-----------------|
| <img src = "https://github.com/thgee/Withyou/assets/102576089/089d53dd-25b8-4d95-93ae-1830b4ceb54f"  width = "500px"/> | <img src = "https://github.com/thgee/Withyou/assets/102576089/7c0df8a2-71bf-47dc-820e-6114d9a366e0"  width = "250px"/> |


<br>

### 1. 연습면접


- 사용자가 지원한 직무에 대한 기술질문을 끝없이 제공합니다.

| 연습면접 |
| ------------------------------------------------------------------------------------------------------ |
| <img src = "https://github.com/thgee/Withyou/assets/102576089/ef6c08a6-3937-4a57-be7d-36efc9ab5c6b" /> |

<br>

### 2. 실전면접

- 2개의 인성질문, 2개의 기술질문으로 진행되며 면접이 끝나고 면접에 대한 피드백과 합격 여부를 제공합니다.

  
| 실전면접 |
| ------------------------------------------------------------------------------------------------------ |
| <img src = "https://github.com/thgee/Withyou/assets/102576089/6765a2d8-3e39-4b4b-b6db-fbadb1dade8e" /> |

<br>

### 3. 하드면접

- 상당히 까다롭고 부정적인 면접관이 등장하여 다양한 상황에서의 면접을 대비할 수 있도록 합니다.

  
| 하드면접 |
| ------------------------------------------------------------------------------------------------------ |
| <img src = "https://github.com/thgee/Withyou/assets/102576089/eebad0a1-708c-4591-9a1e-15e7321e1231" /> |

<br>

## 🌴 세부 기술스택과 채택한 이유

### Typescript

- 버그그 방지를 위해 사용하였습니다.
- 사실 JS만으로도 충분히 구현할 수 있는 작은 프로젝트였지만 TS에 조금이나마 익숙해지기 위해서 도입하였습니다.

### SCSS

- Nesting을 이용하여 선택자 표기를 간단히 하는 것을 주 목적으로 사용하였습니다.

### CSS-Module

- ClassName 중복으로 인한 버그를 피하기 위해서 사용하였습니다.
- 컴포넌트별 CSS 파일이 분리되어 있어 전역 CSS를 사용할 때 보다 유지보수에 용이합니다.

### react-spring

- 애니메이션 실행 시 컴포넌트가 리렌더링 되지 않는다는 장점을 이용해 애니메이션 성능을 향상시키기 위해 사용하였습니다.

### react-transition-group

- 컴포넌트 마운트, 언마운트 시에 애니메이션을 구현하기 위해 사용하였습니다.

### react-responsive

- 컴포넌트 내에서 해당 뷰포트가 PC환경인지 모바일환경인지 판단하기 위해 사용하였습니다.

<br>

## 🌴 개발 진행 방식

- [GitHub Milestone](https://github.com/thgee/Withyou/milestones?state=closed) 에 개발에 필요한 큰 틀을 작성하였습니다.
- [GitHub Issues](https://github.com/thgee/Withyou/issues?q=is%3Aissue+is%3Aclosed)를 통해 작은 구현목표를 정하고, 개발중 발생한 문제들과 진행사항을 comment에 기록하였습니다.

<br>

## 🌴 폴더 구조

```
withyou
│
├─README.md
│
├─backend
│  │  .gitignore
│  │  package-lock.json
│  │  package.json
│  │  server.ts
│  │  tsconfig.json
│  │  types.ts
│  │
│  ├─build
│  │  │
│  │  └─ ...
│  │
│  │
│  ├─routes
│  │      interview.ts
│  │
│  └─utils
│          initPrompt.js
│
└─frontend
    │  .gitignore
    │  package-lock.json
    │  package.json
    │  tsconfig.json
    │
    ├─public
    │  │  index.html
    │  │  manifest.json
    │  │  robots.txt
    │  │  thumbnail.png
    │  │
    │  └─assets
    │          logo.png
    │          Spinner1.gif
    │          Spinner2.gif
    │
    └─src
        │  App.scss
        │  App.tsx
        │  global.d.ts
        │  index.css
        │  index.tsx
        │
        ├─components
        │  ├─Home
        │  │      HomeLeftContainer.module.scss
        │  │      HomeLeftContainer.tsx
        │  │      HomeRightContainer.module.scss
        │  │      HomeRightContainer.tsx
        │  │      ModeBox.module.scss
        │  │      ModeBox.tsx
        │  │
        │  └─Interview
        │          ChatBox.module.scss
        │          ChatBox.tsx
        │          InputAns.module.scss
        │          InputAns.tsx
        │          Navbar.module.scss
        │          Navbar.tsx
        │
        ├─constants
        │      constants.tsx
        │
        ├─pages
        │      Home.module.scss
        │      Home.tsx
        │      Interview.module.scss
        │      Interview.tsx
        │
        ├─types
        │      types.ts
        │
        └─utils
                InterviewFlowAPI.tsx
```

<br>

## 🌴 개발일지 및 트러블 슈팅

* [개발일지 및 트러블 슈팅 모음](https://thgee.notion.site/7ee9fefd33a445b6af5eef8341bf48cb?pvs=4)



<br>
