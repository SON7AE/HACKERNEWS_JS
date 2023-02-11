const AJAX = new XMLHttpRequest()
const CONTAINER = document.getElementById('root')
const CONTENT = document.createElement('div')
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
// 실제 사용자가 타이틀을 클릭했을 때, CONTENTS_URL을 가지고 AJAX 호출을 하여 데이터를 가져오자.
// 이벤트 시스템은 브라우저가 제공한다.
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

function getData(url) {
    AJAX.open('GET', url, false) // false : 동기적으로 처리하겠다는 옵션
    AJAX.send()

    return JSON.parse(AJAX.response)
}

const NEWSFEED = getData(NEWS_URL)
const ul = document.createElement('ul')

// 상세 페이지
window.addEventListener('hashchange', function () {
    const id = this.location.hash.substring(1) // 내가 쓰고 싶은 위치 값을 지정해주면 된다. 그 이후의 나머지 문자열들만 반환한다.

    const NEWSCONTENT = getData(CONTENT_URL.replace('@id', id))
    const title = document.createElement('h1')

    title.innerHTML = NEWSCONTENT.title

    CONTENT.appendChild(title)
})

// 메인 페이지
for (let i = 0; i < 10; i++) {
    const div = document.createElement('div')
    div.innerHTML = `
        <li>
            <a href="#${NEWSFEED[i].id}">
                ${NEWSFEED[i].title} ${NEWSFEED[i].comments_count}) 
            </a> 
        </li>
    `
    ul.appendChild(div.firstElementChild)
}

// appendChild - 자식을 추가한다 라는 의미로 받아들이자.
CONTAINER.appendChild(ul) // 메인 페이지
CONTAINER.appendChild(CONTENT) // 상세 페이지
