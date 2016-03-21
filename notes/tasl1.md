

今天开始学习前端，这个主要是参加百度ife的笔记。记笔记方便自己，也给其他自学的同学一个参考。
 [任务一：零基础HTML编码](http://ife.baidu.com/task/detail?taskId=1)  

学习的资料均在上面链接中有，我在这里也贴一下
- [Web相关名词通俗解释](https://www.zhihu.com/question/22689579)
- [MDN HTML入门](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Introduction)
- [慕课HTML+CSS基础教程视频](http://www.imooc.com/learn/9)

而这篇既然叫笔记，也就是简单记录方便我回顾，毕竟只学一遍是容易忘记的。因为任务一只是html学习，慕课网的教程先学完前五章便可，后面的在任务二的时候再学习。

## Web相关名词

1. **html** 一种标记语言，用来告诉浏览器应该怎样显示内容，如 `<img src="001.png">` 这样来告诉浏览器显示图片，还有其他的文字、表格。按钮等
2. **css** 用来规定显示的样式，也就是如何排版和字体颜色等改变显示内容让页面变得美观。
3. **JavaScript** 一种脚本语言，主要用于实现一些动态效果。如：鼠标滑过弹出下拉菜单。或鼠标滑过表格的背景颜色改变

## html入门

- **标签的语法**  **标签**由英文尖括号`<`和`>`括起来，如`<html>`就是一个标签。html中的标签一般都是成对出现的，分 **开始标签** 和 **结束标签** 。结束标签比开始标签多了一个`/`。标签与标签之间是可以嵌套的，但先后顺序必须保持一致，如：`<div>`里嵌套`<p>`，那么`</p>`必须放在`</div>`的前面。如下图所示。另外`html`不区分大小写，一般建议用小写。

- **html文档结构**
  固定式如下。head为头部，body为主要内容。
  ```
  <html>
    <head>...</head>
    <body>...</body>
  </html>
  ```

- **head标签** 可以有如下内容
  ```
  <head>
    <title>...</title>
    <meta>
    <link>
    <style>...</style>
    <script>...</script>
  </head>
  ```

- **注释** `<!-- 注释文字 -->`

- **body标签相关**

|   名称   |                    代码                    | 说明                                       |
| :----: | :--------------------------------------: | ---------------------------------------- |
|   段落   |              `<p>段落文字</p>`               | -                                        |
|   标题   |             `<h1>一级标题</h1>`              | 二级标题用h2，依此类推,共6级                         |
|   斜体   |            `<em>要斜体的文字</em>`             | -                                        |
|   粗体   |        `<strong>要粗体的文字</strong>`         | -                                        |
|  单独样式  |         `<span>要设置样式的文字</span>`          | -                                        |
| 短文本引用  |              `<q>引用文本</q>`               | 被引用的文本不加双引号                              |
| 长段文本引用 |     `<blockquote>引用文本</blockquote>`      | 被引用的文本不加双引号                              |
|   换行   |                 `<br />`                 | html中是忽略**回车**和**空格**的                   |
|   空格   |                   ` `                    | 同上，要有分号                                  |
| 水平分隔横线 |                 `<hr />`                 | -                                        |
|   地址   |         `<address>北京</address>`          | -                                        |
|  单行代码  |            `<code>...</code>`            | -                                        |
|  多行代码  |             `<pre>代码段</pre>`             | -                                        |
|   -    |                    -                     | -                                        |
|  无序列表  |   `<ul> <li>信息</li> <li>信息</li> </ul>`   | 前面带小圆点                                   |
|  有序列表  |   `<ol> <li>信息</li> <li>信息</li> </ol>`   | 前面带数字编号                                  |
|   容器   |         `<div id="版块名称"></div>`          | 将元素组成一个单独的逻辑部分                           |
|   链接   | `<a href="www.xx.com" target="_blank" title="我的博客">博客</a>` | target那个表示在新标签页中打开链接，title为鼠标移动到链接处浮现的说明 |
|   图片   | `<img src="1.png" alt="下载失败显示文本" title="图片描述" />` | -                                        |

- **mailto**
  [看这里的图](http://www.imooc.com/code/317)

- **表格**
  ```
  <table summary="表格简介">
  <caption>成绩单</caption>
  <tbody>
    <tr>
      <th>班级</th>
      <th>学生数</th>
      <th>平均成绩</th>
    </tr>
    <tr>
      <td>一班</td>
      <td>30</td>
      <td>89</td>
    </tr>
    <tr>
      <td>二班</td>
      <td>35</td>
      <td>85</td>
    </tr>
    <tr>
        <td>三班</td>
        <td>32</td>
        <td>80</td>
    </tr>
  </tbody>
  </table>
  ```

|                                          |                                          |
| ---------------------------------------- | ---------------------------------------- |
| `<table>…</table>`                       | 表格的开始和结束，定义全在中间                          |
| `<tbody>…</tbody>`                       | 当表格内容非常多时，表格会下载一点显示一点，但如果加上`<tbody>`标签后，这个表格就要等表格内容全部下载完才会显示。 |
| `<tr>…</tr>`                             | 表格的一行，所以有几对 `tr` 表格就有几行。                 |
| `<td>…</td>`                             | 表格的一个单元格，一行中包含几对 `<td>`说明一行中就有几列。表格中列的个数，取决于一行中数据单元格的个数 |
| `<th>…</th>`                             | 表格的头部的一个单元格，**表格表头**                     |
| `<caption>标题文本</caption>`                | 表格标题                                     |
| `<style type="text/css">table tr td,th{border:1px solid #000;}</style>` | 表格样式：加上边框                                |

- **表单和控件**
  ```
  <form   method="传送方式"   action="服务器文件">
  ```
  1.**<form> ：**<form>标签是成对出现的，以<form>开始，以</form>结束。
  2.**action** **：**浏览者输入的数据被传送到的地方,比如一个PHP页面(save.php)。
  3.**method** **：** 数据传送的方式（get/post）。

| 控件名   | 代码                                       | 说明                    |
| ----- | ---------------------------------------- | --------------------- |
| 文本输入框 | `<input type="text" name="user">`        | -                     |
| 密码输入框 | `<input type="password" name="password">` | -                     |
| 文本区域  | `<textarea rows="行数" cols="列数">文本</textarea>` | -                     |
| 复选框   | `<input type="checkbox" value="值" name="名称" checked="checked"/>` | -                     |
| 单选框   | `<input type="radio" value="值" name="名称" checked="checked"/>` | name要一致               |
| 下拉选择框 | `<select multiple="multiple"><option value="看书">看书</option><option value="旅游" selected="selected">旅游</option></select>` | 设置multiple后可以按住ctrl多选 |
| 提交按钮  | `<input type="submit" value="提交">`       | -                     |
| 重置按钮  | `<input type="reset" value="重置">`        | -                     |
| 文本    | `<label for="控件id">显示内容</label>`         | for表示是哪个控件的描述文本       |
