const AJAX = new XMLHttpRequest()
const CONTAINER = document.getElementById('root')
const CONTENT = document.createElement('div')
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
// 실제 사용자가 타이틀을 클릭했을 때, CONTENTS_URL을 가지고 AJAX 호출을 하여 데이터를 가져오자.
// 이벤트 시스템은 브라우저가 제공한다.
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

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

// 상세 페이지
window.addEventListener('hashchange', function () {
    const id = this.location.hash.substring(1) // 내가 쓰고 싶은 위치 값을 지정해주면 된다. 그 이후의 나머지 문자열들만 반환한다.
    AJAX.open('GET', CONTENT_URL.replace('@id', id), false)
    AJAX.send()

    const NEWSCONTENT = JSON.parse(AJAX.response)

    const title = document.createElement('h1')
    title.innerHTML = NEWSCONTENT.title

    CONTENT.appendChild(title)
})

// 메인 페이지
for (let i = 0; i < 10; i++) {
    const li = document.createElement('li')
    const a = document.createElement('a')

    a.href = `#${NEWSFEED[i].id}`
    a.innerHTML = `${NEWSFEED[i].title} (${NEWSFEED[i].comments_count})`

    a.addEventListener('click', function () {})

    ul.appendChild(li)
    li.appendChild(a)
}

// appendChild - 자식을 추가한다 라는 의미로 받아들이자.
CONTAINER.appendChild(ul) // 메인 페이지
CONTAINER.appendChild(CONTENT) // 상세 페이지
