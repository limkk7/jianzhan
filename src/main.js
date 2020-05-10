const $siteList = $(".siteList")
const $lastLi = $siteList.find('li.last')
const xObject = JSON.parse(localStorage.getItem('website'))
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" }
]

const replaceUrl = (url) => {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\.*/, '')
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <!-- <img class="logo" src=${'http://www.google.com/s2/favicons?domain=' + node.url}>-->
        <div class="link">${replaceUrl(node.url)}</div>
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconclose"></use>
          </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi)
    $li.on('click', (e) => {
      window.open(node.url)
    })

    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()

$('.addButton').on('click', () => {
  let url = window.prompt('请添加网址')
  if (url.indexOf('http') === -1) {
    url = 'https://' + url
  }
  hashMap.push({
    logo: replaceUrl(url)[0].toUpperCase(),
    url: url
  })
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('website', string)
}

$(document).on('keypress', (e) => {
  const { key } = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})
$('.wd-input').on('keypress', (e) => {
  e.stopPropagation()
})