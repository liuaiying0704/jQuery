$(function () {
  // 1. 全选 全不选功能模块
  // 1.1.就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
  // 1.2.如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选
  console.log(11);
  $('.checkall').change(function () {
    console.log($(this).prop('checked'));
    $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
    if ($(this).prop('checked')) {
      // cart-item check-cart-item
      $('.cart-item').addClass('check-cart-item');
    } else {
      $('.cart-item').removeClass('check-cart-item');
    }
  });

  // 1.2.如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选
  // :checked 选择器
  $('.j-checkbox').change(function () {
    console.log('====');
    // if (如果小复选框被选中的个数等于3) {
    //     全选按钮选上
    // } else {
    //     全选按钮不选
    // }
    console.log($('.j-checkbox:checked'));
    if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
      $('.checkall').prop('checked', true);
    } else {
      $('.checkall').prop('checked', false);
    }
    if ($(this).prop('checked')) {
      $(this).parents('.cart-item').addClass('check-cart-item');
      // $('.cart-item').removeClass('check-cart-item')
    } else {
      $(this).parents('.cart-item').removeClass('check-cart-item');
    }
  });

  // 2.增减商品数量
  // 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
  $('.increment').click(function () {
    var n = $(this).siblings('.itxt').val(); // 获取商品数量
    console.log(n);
    n++;
    $(this).siblings('.itxt').val(n);
    // 3.修改商品小计
    // 每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格  就是 商品的小计
    // 获取当前的价格
    var p = $(this).parents('.p-num').siblings('.p-price').text();
    // 字符串截取 substr()
    p = p.substr(1);
    console.log(p);
    // toFixed(2)
    $(this)
      .parents('.p-num')
      .siblings('.p-sum')
      .text(`¥ ${(p * n).toFixed(2)}`);
    getSum();
  });

  $('.decrement').click(function () {
    var n = $(this).siblings('.itxt').val();
    console.log(n);
    if (n == 1) return;
    n--;
    $(this).siblings('.itxt').val(n);

    var p = $(this).parents('.p-num').siblings('.p-price').text();
    p = p.substr(1);
    console.log(p);
    // toFixed(2)
    $(this)
      .parents('.p-num')
      .siblings('.p-sum')
      .text(`¥ ${(p * n).toFixed(2)}`);
    getSum();
  });

  // 4、监听 itxt 输入框的变化
  // 用最新的表单内的值 乘以 单价即可  但是还是当前商品小计
  $('.itxt').change(function () {
    // console.log(12312);
    var n = $(this).val();
    if (n < 1) {
      alert('商品数量必须大于等于1');
      $(this).val(1);
      return;
    }
    var p = $(this).parents('.p-num').siblings('.p-price').text();
    p = p.substr(1);
    $(this)
      .parents('.p-num')
      .siblings('.p-sum')
      .text(`¥ ${(p * n).toFixed(2)}`);
    getSum();
  });

  // 5.计算总计和总额
  getSum();
  function getSum() {
    var count = 0; //总件数
    var money = 0; //
    $('.itxt').each(function (i, ele) {
      count += parseInt($(ele).val());
    });
    $('.p-sum').each(function (i, ele) {
      console.log($(ele).text().substr(1));
      money += parseFloat($(ele).text().substr(1));
    });
    console.log(count);
    $('.amount-sum em').text(count);
    $('.price-sum em').text(`¥ ${money.toFixed(2)}`);
  }

  // 6.删除商品模块
  // 6.1.商品后面的删除按钮
  $('.p-action a').click(function () {
    $(this).parents('.cart-item').remove();
    getSum();
  });
  // 6.2.删除选中的商品
  $('.remove-batch').click(function () {
    $('.j-checkbox:checked').parents('.cart-item').remove();
    getSum();
  });
  // 6.3.清空购物车
  $('.clear-all').click(function () {
    $('.cart-item-list').empty();
    getSum();
  });
});
