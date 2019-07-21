const Adaper = require('./Adaper')
const Bridge = require('./Bridge')

const adaper = new Adaper()
const bridge = new Bridge(adaper)

// web -> native -> web

// web subscribe base/themeChange
const unsubscribe = bridge.listen('base/themeChange', ({ theme }) =>
  console.log(`theme is ${theme}`)
)

// native publish base/themeChange
webApp
  .dispatch('base/themeChange', { theme: 'light' })
  .then(success => console.log(success))
  .catch(err => console.log(err))

// unsubscribe base/themeChange
unsubscribe()

// web -> native

// web dispatch base/openURL
bridge
  .dispatch('base/openURL', { url: 'url' }, function(params) {
    // 不希望传递 callBack。希望可以处理成 Promise
    console.log(`openURL ${params}`)
  })
  // .then(success => console.log(`openURL ${success}`))
  // .catch(err => console.log(`openURL ${err}`))

// native callBack base/openURL
setTimeout(() => {
  webApp.callBack('1', { status: 'success/fail' }).then(arg => console.log(arg))
})
