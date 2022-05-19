$(function () {
  load();
  // 1. 按下回车 把完整数据 存储到本地存储里面
  // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
  $('#title').on('keyup', function (e) {
    if (e.keyCode === 13) {
      // enter
      // 取数据
      if ($(this).val().trim().length <= 0) {
        $(this).val('');
        alert('Please enter');
        return;
      }
      var local = getData();
      local.push({ title: $(this).val(), done: false });
      console.log(local);
      // 存数据
      setData(local);
      load();
      $(this).val('');
    }
  });
  // 2. toDoList 删除操作
  $('ol, ul').on('click', 'a', function () {
    // index
    var index = $(this).attr('id');
    console.log(index);
    // 取数据
    var data = getData();
    // 更改数据
    // splice()
    data.splice(index, 1);
    // 保存数据
    setData(data);
    load();
  });
  // 3. toDoList 正在进行和已完成选项操作
  $('ol, ul').on('change', 'input', function () {
    var index = $(this).siblings('a').attr('id');
    // 取数据
    var data = getData();
    // 更改数据
    data[index].done = $(this).prop('checked');
    // 保存数据
    setData(data);
    load();
  });
});

// 获取数据
function getData() {
  var data = localStorage.getItem('todolist');
  if (data != null && data != 'undefined') {
    return JSON.parse(data);
  } else {
    return [];
  }
}
// 存数据
function setData(data) {
  localStorage.setItem('todolist', JSON.stringify(data));
}

// 渲染页面
function load() {
  // 取数据
  var data = getData();
  $('ol').empty();
  $('ul').empty();
  var donecount = 0;
  var todocount = 0;
  $.each(data, function (i, ele) {
    if (ele.done) {
      $('ul').prepend(
        `<li><input type='checkbox' checked> <p>${ele.title}</p> <a href='javascript:;' id=${i}></a></li> `
      );
      donecount++;
    } else {
      $('ol').prepend(
        `<li><input type='checkbox' > <p>${ele.title}</p> <a href='javascript:;' id=${i}></a></li> `
      );
      todocount++;
    }
  });

  $('#donecount').text(donecount);
  $('#todocount').text(todocount);
}
