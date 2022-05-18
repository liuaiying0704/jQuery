$(function () {
  // 1.当页面滚动的距离大于今日推荐(recommend) 模块的顶部距离，就让电梯导航显示出来
  var boxTop = $('.recommend').offset().top;
  var flag = true;
  function toggle() {
    if ($(document).scrollTop() > boxTop) {
      $('.fixedtool').fadeIn();
    } else {
      $('.fixedtool').fadeOut();
    }
  }
  toggle(); //如果刷新但没滚动，页面加载调用一次
  $(window).scroll(function () {
    toggle();
    // if ($(document).scrollTop() > boxTop) {
    //   $('.fixedtool').fadeIn();
    // } else {
    //   $('.fixedtool').fadeOut();
    // }
    // 4、当滚动到内容区域某个模块，左侧电梯导航高亮。
    if (flag) {
      $('.floor .w').each(function (index, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $('.fixedtool li')
            .eq(index)
            .addClass('current')
            .siblings('li')
            .removeClass('current');
        }
      });
    }
  });
  // 2、点击电梯导航页面可以滚动到相应的内容区域
  $('.fixedtool li').click(function () {
    flag = false;
    // 当前的li得索引号
    var index = $(this).index();
    // 拿到对应的模块
    console.log($('.floor .w').eq(index));
    // 页面滚动的距离
    var current = $('.floor .w').eq(index).offset().top;
    // 让页面滚起来
    $('html,body')
      .stop()
      .animate(
        {
          scrollTop: current + 1,
        },

        function () {
          flag = true;
        }
      );

    $(this).addClass('current').siblings('li').removeClass('current');
  });
  // 3、点击电梯导航的某个li，当前的li添加current类，兄弟移除类名。
  // 4、当滚动到内容区域某个模块，左侧电梯导航高亮。
});
