# 🚀sMarket 기술 공유 플랫폼

> **각 프로젝트 코드는 각 BRANCH에서 볼 수 있습니다.<br>
프로젝트 자료는 docs 패키지에서 볼 수 있습니다.**

* 목적 : 2022 스마일게이트 윈터 데브 캠프의 팀 프로젝트입니다
* 인원 : 김성윤(BE),남정진(BE),이다혜(FE),김근범(AOS)
* 기간 : 2022.01~2022.02

* 프로젝트 소개
  - 판매자가 자신의 기술을 공유할 수 있는 플랫폼
  - 기술 공유를 위해서 1대1 채팅, 음성 채팅, 화상 채팅 기능을 제공

## ✨시스템 아키텍처
![image](https://user-images.githubusercontent.com/90383376/221118705-042391fc-9e2e-40a5-95e2-da6ecbc0a568.png)

## ✨기술 스택
> 해당 프로젝트를 수행하며 사용할 기술 스택입니다.
- Front-end 스택
  - React.js
  - TypeScript
  - Context
  - Figma

- Android 스택
  - Kotlin
  - Android Studio
  - SQLite
  - Figma

- BE 스택
  - Spring MVC
  - STOMP
  - Spring Web Socket
  - SockJs
  - OAuth
  - WebRTC SFU(Mediasoup)
  - Socket.io
  - express
  -
## ✨모듈 별 기능
> 각 모듈 별 기능을 나열하였습니다
* 앱/웹 공통
   - 로그인/가입
   - 홈 (당근마켓과 유사) → 게시글 리스트
   - 검색바
   - 판매화면(글 제목, 가격 입력, 게시글 내용 작성, 사진 첨부)
   - 채팅 (구매자-판매자)
* 앱
    - 1:1 채팅 대화
    - 1:1 전화
* 웹
    - 1:1 채팅 대화
    - 1:N 영상통화
    - 1:N 화면공유(Optional)


