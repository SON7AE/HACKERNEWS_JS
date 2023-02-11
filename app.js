const AJAX = new XMLHttpRequest()
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'

AJAX.open('GET', NEWS_URL, false) // false : 동기적으로 처리하겠다는 옵션
AJAX.send()

// 네트워크를 통해서 가져온 데이터를 어떻게 다룰 것인가? 이 질문을 고민해보자.
const NEWSFEED = JSON.parse(AJAX.response)

// 아래 코드로 작성하면 UI가 li 목록 하나만 보일 것이다.
// 그 이유는 for문은 10번 다 돌았는데 ul, li 태그 하나만 하위에다가 넣기 때문이다.
// 즉 오버라이팅이 되기 때문이다.

// for (let i = 0; i < 10; i++) {
//     document.getElementById('root').innerHTML = `<ul>
//     <li>${NEWSFEED[i].title}</li>
// </ul>`
// }

const ul = document.createElement('ul')

for (let i = 0; i < 10; i++) {
    const li = document.createElement('li')
    li.innerHTML = NEWSFEED[i].title
    ul.appendChild(li)
}

// appendChild - 자식을 추가한다 라는 의미로 받아들이자.
document.getElementById('root').appendChild(ul)
