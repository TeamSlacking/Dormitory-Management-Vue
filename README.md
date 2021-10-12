<!-- TOC -->

- [项目结构（参考）](#%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%8F%82%E8%80%83)
- [CSS 类名要求](#css-%E7%B1%BB%E5%90%8D%E8%A6%81%E6%B1%82)

<!-- /TOC -->

## 项目结构（参考）
```
│  home.html                # 根目录只用于存放 HTML 文件
│  index.html
│  README.md
│
├─components                # 该文件夹存放编写的组件
│      v-button.js
│      v-table.js
│
├─controller                # 该文件夹存放 HTML 的 
│      home.js              # JavaScript部分
│      index.js
│
├─public                    # 用于存放第三方依赖
│  ├─bootstrap              # 如 Vue / BootStrap
│  ├─css
│  │      tailwind.css
│  │
│  └─js
│          mock.js
│          vue.js
│
├─style                     # 用于存放 css 样式
│      common.css           # common.css 为公共样式
│      home.css             # 文件名与页面或组件的文件同名
│      index.css
│      v-button.css
│      v-table.css
│
└─utils                 # 该文件夹存放公共逻辑，如登录检查
        check-login.js
```

## CSS 类名要求
css 的每个类名都要以文件名开头（除了 common.css 内的类)，比如在用于 v-table 组件的 v-table.css内，类名要写成 v-table-header，防止起了同样的类名发生冲突。

> v-table.css
```css
.v-table-header {
    height: 114px;
    width: 514px;
}
```

> index.css
```css
.index-header {
    height: 1919px;
    width: 810px;
}
```
