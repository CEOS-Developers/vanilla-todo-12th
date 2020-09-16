# Key Questions에 대한 정리



- DOM은 무엇인가요?
- HTML (tag) Element를 JavaScript로 생성하는 방법은 어떤 것이 있고, 어떤 방법이 가장 적합할까요?
- DOM에서 발생하는 Event는 방법에는 어떤 것이 있고, 어떤 방법이 가장 적합할까요?
- Flexbox Layout은 무엇이며, 어떻게 사용하나요?
- JavaScript가 다른 언어들에 비해 주목할만한 점에는 어떤 것들이 있나요?
- 코드의 추상화 수준이란 무엇인가요?
- 코드에서 주석을 다는 바람직한 방법은 무엇일까요?



### DOM은 무엇인가요?

브라우저에 이미 내장되어 있는 모델로, js언어로 HTML에 접근하기 위해 사용됩니다. document에는 HTML을 다루는 여러가지 메소드들이 존재합니다.

<img src="https://user-images.githubusercontent.com/56102421/93298489-3df6f400-f82e-11ea-87e1-8479d5609b1c.png" > 



### HTML (tag) Element를 JavaScript로 생성하는 방법은 어떤 것이 있고, 어떤 방법이 가장 적합할까요?

**HTML 태그 생성 방법** 

이번 미션에서 사용했던 방식은 아래와 같습니다.

1️⃣ dom의 createElement 메소드를 이용하여 태그를 생성한다.

2️⃣ 태그에 class, value, textContent, listener 등 부여한다.

3️⃣ 부모 태그를 찾은 후 appendChild() 메소드를 사용하여 기존 HTML에 붙인다.

**어떤 방법이 가장 적합할까?**

3번 코드에서 1,2번을 전부 할 수 있다면 훨씬 간단하게 코드를 짤 수 있을 것 같습니다.

**갑자기 든 의문?** To do List 과제에서는 `li`와 `img`태그를 필요할 때마다 계속 만들어주었습니다. 하지만 필요할 때마다 계속 만들어준다면 모바일에서는 메모리를 계속 차지하게 되어 메모리 사용에 비효율적이고, 나중에 폰이 멈출 수도 있게 됩니다. web은 모바일과 같이 작은 폰에 담기는 것이 아닌, 페이지가 로드될 때마다 서버에서 HTML, CSS, JS를 받아오는 방식이라 이런 문제가 없을 수도 있을 것 같지만.. 혹시 아시는 분 있나요 ㅠ 

cf> iOS에서는 dequeue메소드와 같이 데이터를 담는 상자는 반복하여 사용하면서 메모리 사용을 최소화해주고, 그 안에 데이터만 바꿔주거나, lazy 변수를 사용하여 필요할 때마다 메모리를 주고 필요하지 않을 땐 메모리에 해제하는 방식 등을 사용합니다. 



### DOM에서 발생하는 Event는 방법에는 어떤 것이 있고, 어떤 방법이 가장 적합할까요?

DOM에서 발생하는 Event엔 여러가지가 있고 [이 사이트](https://developer.mozilla.org/ko/docs/Web/Events)를 참고했습니다. 미션에서는 `click` `submit` 두 가지 event만 사용하였고, 그 상황마다 Event가 발생하는 시점을 잘 생각해보고 결정해야할 것 같습니다.



### Flexbox Layout은 무엇이며, 어떻게 사용하나요?

미션을 하면서 css 구성하는데 정말 어려움이 많았습니다..^^.. 그래서 이것저것 찾아보다 css 프레임워크에도 Grid, boostrap 등과 같이 여러가지가 있다는 것을 알았습니다. 그리고 슬랙에 공유된 flexbox에 대한 [자료](https://heropy.blog/2018/11/24/css-flexible-box/)를 읽어보았는데 정말 간편했습니당 ㅎㅎ Flexbox Layout은 기존 CSS만으로 layout을 구성하기 어려워 CSS3에 새로 나온 layout 방식입니다. 사용 방법은 아래와 같습니다. 

```html
<div class="container">
  <div class="item">1번상자</div>
  <div class="item">2번상자</div>
</div>
```

```css3
.container {
  display: flex; // flexbox layout 
  flex-direction: row; // 가로 배치
  align-content: stretch; // 교차 축의 정렬방법
  justify-content: center; // 주 축의 정렬방법
}
```

위 네개만 알아도 배치는 거의 완성할 수 있었습니다.

👉  [연습하기 좋은 사이트](http://flexboxfroggy.com/#ko)도 발견



### JavaScript가 다른 언어들에 비해 주목할만한 점에는 어떤 것들이 있나요?

- JS에서 함수는 객체이고, 함수를 생성하는 방법은 다양함

  ```javascript
  function add(x, y) {
  	return x+y;
  }
  
  var add = function(x,y) {
    return x+y;
  }
  // ES6
  var add = (x,y) => {
    return x+y;
  }
  ```

- var, let, const 차이

  | var          | let            | const          |
  | ------------ | -------------- | -------------- |
  | 재 선언 가능 | 재 선언 불가능 | 재 선언 불가능 |
  | 재할당 가능  | 재할당 가능    | 재할당 불가능  |



### 코드의 추상화 수준이란 무엇인가요?

🤯 더 생각해볼 것



### 코드에서 주석을 다는 바람직한 방법은 무엇일까요?

협업할 때: 

- 자주 사용되는 기능을 가진 함수 위에 어떤 기능을 수행하지 알 수 있도록 달기. 
- 함수엔 매개변수나 return 값이 무엇인지도 함께 달면 좋을 거 같다.

공부할 때:

- 몰랐던 것
- 참고한 사이트주소