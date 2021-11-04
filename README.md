# Dormitory Management 宿舍管理系统

项目实例：https://dormitory-management-vue.pages.dev/

用户名（系统管理员）：admin

密码：123

***

<!-- TOC -->

- [项目结构（参考）](#%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%8F%82%E8%80%83)
- [CSS 类名要求](#css-%E7%B1%BB%E5%90%8D%E8%A6%81%E6%B1%82)
    - [单文件组件文件的大小写](#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99)
    - [紧密耦合的组件名](#%E7%B4%A7%E5%AF%86%E8%80%A6%E5%90%88%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D)
    - [组件要求在模块系统中局部注册](#%E7%BB%84%E4%BB%B6%E8%A6%81%E6%B1%82%E5%9C%A8%E6%A8%A1%E5%9D%97%E7%B3%BB%E7%BB%9F%E4%B8%AD%E5%B1%80%E9%83%A8%E6%B3%A8%E5%86%8C)
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

### 单文件组件文件的大小写
在本项目中，单文件组件的文件名应该始终是横线连接 (kebab-case)。
> 反例
```
components/
|- mycomponent.vue
|- myComponent.vue

```
> 好例子
```
components/
|- my-component.vue
```

### 紧密耦合的组件名
> 反例
```
components/
|- admin-management.js
|- admin-table-row.js
```

> 好例子
```
components/
|- admin-management.js
|- admin-management-table-row.js
```

### 组件要求在模块系统中局部注册

由于 HTML 是大小写不敏感的，在 DOM 模板中必须使用 kebab-case作为组件名风格。

> 反例
```javascript
Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})
```

> 好例子
```
components/
|- todo-list.js
|- todo-item.js
```

```javascript
import { TableRow } from "./admin-management-table-row.js";

// 注意导出的组件命名为大写字母开头
export const AdminManagement = {
  name: "admin-management",
  components: {
    "table-row": TableRow,
  },
  template: `
    <div>
      <span>{{ bar }}</span>
      <table-row/>
      <table-row/>
    </div>
  `,
  data: {
    bar: "foo",
  },
  // ...
}
```

### CSS 类名要求
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
