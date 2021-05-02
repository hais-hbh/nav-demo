const $searchLi = $('.typeList > li')
const $form = $('.searchForm')
const $input = $('input')
const $siteList = $('.siteList')
const $last = $siteList.find('li.last')
const x = localStorage.getItem('hashMap')
const xObject = JSON.parse(x)
console.log(xObject)
let searchList = [
  { name: 'baidu', action: 'https://www.baidu.com/s', word: 'wd' },
  { name: 'bing', action: 'https://cn.bing.com/search', word: 'q' },
  { name: 'google', action: 'https://www.google.com/search', word: 'q' }
]
// $('.baidu').click(function () {
//   console.log($(this).index())
//   $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose')
//   $form.attr('action', 'https://www.baidu.com/s')
//   $input.attr('name', 'wd')
// })
// $('.google').click(function () {
//   console.log($(this).index())
//   $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose')
//   $form.attr('action', 'https://www.google.com/search')
//   $input.attr('name', 'q')
// })
// $('.bing').click(function () {
//   console.log($(this).index())
//   $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose')
//   $form.attr('action', 'https://cn.bing.com/search')
//   $input.attr('name', 'q')
// })

const hashMap = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn' },
  { logo: 'Q', url: 'https://www.qq.com' },
  { logo: 'B', url: 'https://www.bilibili.com' }
]
$searchLi.click(function () {
  let index = $(this).index()
  $(this).removeClass('noChose').addClass('chose').siblings('li').removeClass('chose').addClass('noChose')
  $form.attr('action', searchList[index].action)
  $input.attr('name', searchList[index].word)
})

const simplifuUrl = (url) => {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace('.com', '').replace('.cn', '').replace(/\/.*/, '')
}
$('.add').on('click', () => {
  let url = window.prompt('请输入网址')
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  hashMap.push({ logo: simplifuUrl(url).toUpperCase()[0], url })
  console.log(hashMap)
  render()
})
const compare = function (prop) {
  return function (obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop]; if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}

const render = () => {
  hashMap.sort(compare('logo'))
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    console.log(hashMap)


    const $li = $(`
 <li>
  <div class="site">
    <div class="logo">${node.logo}</div>
    <div class="link">${simplifuUrl(node.url)}</div>
    <div class="close"><svg class="icon">
      <use xlink:href="#icon-close"></use>
    </svg></div>
  </div>
</li >
`).insertBefore($last)

    $li.find('.site').on('click', () => {
      window.open(node.url, '_self')
    })
    $li.find('.close').on('click', (e) => {
      if (window.confirm('确认要删除？')) {
        hashMap.splice(index, 1)
      }
      e.stopPropagation()
      render()
    })
  })

}
render()
$siteList.bind("contextmenu", function () {
  return false;
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  console.log(string)
  localStorage.setItem('hashMap', string)
}
// $(document).on('keypress', (e) => {
//   const key = e.key
//   for (let i = 0; i < hashMap.length; i++) {
//     console.log(hashMap[i].logo.toLowerCase())
//     if (hashMap[i].logo.toLowerCase() === key) {
//       window.open(hashMap[i].url)
//     }
//   }
// })