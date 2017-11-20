const { resolve } = require('path')
const r = url => resolve(__dirname, url)
const assetsPath = resolve(process.cwd(), './mina')

module.exports = {
  "json": {
    "pages": [
      "pages/index/index",
      "pages/logs/logs"
    ],
    "tabBar": {
      "color": "#7A7E83",
      "selectedColor": "#3cc51f",
      "borderStyle": "black",
      "backgroundColor": "#ffffff",
      "list": [
        {
          "iconPath": "static/home.png",
          "selectedIconPath": "static/home-selected.png",
          "pagePath": "pages/index/index",
          "text": "home"
        },
        {
          "iconPath": "static/shopping.png",
          "selectedIconPath": "static/shopping-selected.png",
          "pagePath": "pages/logs/logs",
          "text": "shop"
        }
      ]
    }
  },
  "window": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "权力的游戏",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "assetsPath": assetsPath,
  "app": r('./app.js')
}