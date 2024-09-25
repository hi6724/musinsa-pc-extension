# 무신사PC
https://chromewebstore.google.com/detail/%EB%AC%B4%EC%8B%A0%EC%82%ACpc/ngdiacennhjfopbpfejahfjlanmjcpob

무신사가 pc버전을 종료하고 불편해서 만들었습니다.
- 최대 600px의 넓이에서 1500px로 키웠습니다.
- 랭킹, 브랜드 등 한줄에 3개씩 보여지는걸 10개로 늘렸습니다.
- 무한스크롤로 되어있던 페이지를 하단의 페이지를 통해 동작하도록 변경했습니다.
- 상세페이지를 좌측에는 상세정보 우측에는 리뷰를 볼 수 있도록 하였습니다.
<br/><br/><br/><br/><br/>

# 기능 설명
<br/>

## InfiniteScroll을 Pagination으로 바꿈

![image](https://github.com/user-attachments/assets/b31c5711-b728-4bca-8ce1-71721ab93ab8)

![image](https://github.com/user-attachments/assets/5966daea-64b1-4668-a030-1acb043a1c0b)
<br/>
기존 무신사서버에서 렌더링 한 상품들을 모두 지우고 <br/>
무신사 API를 익스텐션에서 자체적으로 호출 한 뒤, 응답값을 innerHTML로 다시 렌더링했습니다.<br/><br/>

URL이 변경될 때 마다, 모두 지우고 새로 API를 호출하고 리렌더링 하는 과정을 반복합니다.<br/><br/>

좋아요 페이지의 API의 경우는 nextCursor가 null이 될때까지 재귀적으로 API호출 후 Pagination 형태로 재구성 하였음.

## 상세페이지

![image](https://github.com/user-attachments/assets/cf9c319d-7c80-4e74-882b-aabf6e547417)
<br/>
![image](https://github.com/user-attachments/assets/a9dfea25-80f6-4584-a954-5f3c19f689ef)
<br/>
좌측에는 기존의 상세페이지, 우측에는 iframe을 이용해서 리뷰페이지를 보여줌. <br/>
상단 토글을 사용하여 포토리뷰와 전체리뷰로 변경이 가능

<br/><br/><br/><br/><br/>
