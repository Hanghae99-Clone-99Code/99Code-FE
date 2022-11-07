![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=99cord&fontSize=90)

# 프로젝트 제목

99cord - 디스코드 클론코딩 프로젝트

## 시작하기

create-react-app

### 사용한 라이브러리

```
Redux-Toolkit
- yarn add react-redux @reduxjs/toolkit
React-Router-Dom
- yarn add react-router-dom

SockJS-Client
- yarn add sockjs-client
StompJS
- yarn add stompjs

Axios
- yarn add axios
Lodash
- yarn add lodash

FontAwesome
- yarn add @fortawesome/fontawesome-free
- import '@fortawesome/fontawesome-free/js/all.js' in index.js
```

## 배포

AWS Amplify 통해 자동배포 중 입니다.
https://main.d3c4xda10t323b.amplifyapp.com/

## 트러블 슈팅
### 중복되는 채팅
채팅방을 여러개 만들다보니 구독상태가 중첩이 되면서 하나의 채팅 Send가 여러개의 Receive 응답으로 돌아오는 상황을 겪음. Stomp의 구독기능에서 구독 id를 정해줄 수 있다는걸 알지못해서 어떻게 특정 구독을 타겟으로 삼아서 정확하게 구독해제 해줄 수 있을지 찾아보다 결국 공식문서를 다시 정독해보고 구독의 아이디를 직접 지정해서 구독 해제를 성공적으로 할 수 있었음.

### 채팅 후 Scroll Down
채팅을 Receive한 후에 스크롤을 채팅 박스 기준 최하단으로 내려줘야하므로 scroll down 관련 함수를 만들었는데, receive한 채팅이 클라이언트에서 관리해주던 채팅목록에 concat되는 과정이 완료되기전에 scroll down이 진행되면서 예상한대로 흘러가지 않음. 고민해보다 settimeOut으로 시간차를 둬서 해결함.

### 채팅방에 입장하며 Scroll Down
채팅방을 들어가면서 해당 채팅방의 채팅 기록을 받기 위해 get요청을 보내고 받아온 채팅기록을 나열해서 보여주게 되는 구조임. 그 후 최하단으로 scroll down을 해야해므로 '채팅 후 Scroll Down' 문제 해결 방법과 같은 방법으로 해결했지만 get 요청이 오래걸릴 경우 완전한 해결방법이 되지못할거라 판단 되었음. lazy loading을 통해 get 요청의 시간을 줄여준다면 해결 될 문제라고 판단하였음.

### 적용 되지 않는 폰트
이번엔 과거 진행했던 미니 프로젝트와는 다르게 폰트를 import해서 사용하는것이 아니라 폰트를 직접 다운로드 받아서 폴더에 넣고 사용했는데, 프로젝트를 배포하고 확인해보니 폰트가 전혀 적용되지 않았음. 분명 로컬환경에선 잘 적용 됐었기 때문에 배포과정에서 있는 문제라고 생각하고 찾아보니 특정 폰트확장자가 인식이 안되는 문제가 있어서 확장자를 추가해줌.

### CSS flex
css의 flex로 나머지 영억을 모두 차지하게 하는 기능을 사용했는데 브라우저 크기가 변경되었을 때 채팅 인풋창의 위치가 처음 렌더링 됐을 때 위치로 고정되어버리는 문제가 발생함. 해당 위치에 영향을 미치는 다른 요소들의 height 값을 고정 해주고 그것들을 합한 값을 이용해서 queryselector로 인풋창의 상대적인 위치를 정해주었음.

### 채팅방 알림 기능
현재 사용자가 보고있지않은 채팅방의 읽지않은 채팅 갯수를 띄워주고 싶었지만 처음 적었던 문제의 해결방법으로 바로바로 구독해제해주는 방법을 채택했더니 알림 기능을 구현해보기가 굉장히 난감했음. 사용했던 tab Context를 활용해 tab의 값에 따라 receive과정에서 차별점을 두는 과정이 필요함.
