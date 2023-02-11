const AJAX = new XMLHttpRequest()
const CONTAINER = document.getElementById('root')
const CONTENT = document.createElement('div')
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
// 실제 사용자가 타이틀을 클릭했을 때, CONTENTS_URL을 가지고 AJAX 호출을 하여 데이터를 가져오자.
// 이벤트 시스템은 브라우저가 제공한다.
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'
const STORE = {
    currentPage: 1,
}

function getData(url) {
    AJAX.open('GET', url, false) // false : 동기적으로 처리하겠다는 옵션
    AJAX.send()

    return JSON.parse(AJAX.response)
}
function newsFeed() {
    // 메인 페이지
    const NEWSFEED = getData(NEWS_URL)
    const NEWSLIST = []

    NEWSLIST.push('<ul>')

    for (let i = (STORE.currentPage - 1) * 10; i < STORE.currentPage * 10; i++) {
        NEWSLIST.push(`
        <li>
            <a href="#/show/${NEWSFEED[i].id}">
                ${NEWSFEED[i].title} (${NEWSFEED[i].comments_count}) 
            </a> 
        </li>
    `)
    }
    NEWSLIST.push('</ul>')
    NEWSLIST.push(`
        <div>
            <a href="#/page/${STORE.currentPage > 1 ? STORE.currentPage - 1 : 1}">이전 페이지</a>
            <a href="#/page/${STORE.currentPage + 1}">다음 페이지</a>
        </div>    
    `)

    CONTAINER.innerHTML = NEWSLIST.join('')
}
function newsDetail() {
    const id = location.hash.substring(7) // 내가 쓰고 싶은 위치 값을 지정해주면 된다. 그 이후의 나머지 문자열들만 반환한다.
    const NEWSCONTENT = getData(CONTENT_URL.replace('@id', id))

    CONTAINER.innerHTML = `
        <h1>${NEWSCONTENT.title}</h1>

        <div>
            <a href="#/page/${STORE.currentPage}">목록으로</a>
        </div>    
    `
}
function router() {
    const routePath = location.hash

    // location.hash가 #만 있을 경우에는 빈 값을 반환한다.
    // 따라서 true를 반환한다.
    if (routePath === '') {
        newsFeed()
    } else if (routePath.indexOf('#/page/') >= 0) {
        STORE.currentPage = Number(routePath.substring(7))
        newsFeed()
    } else {
        newsDetail()
    }
}

window.addEventListener('hashchange', router)

router()
