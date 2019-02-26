; (function ($) {
  var defaults = {
    // nowYear : new Date().getFullYear(),
    // nowMonth : new Date().getMonth(),
    //  yearEnd:nowYear
  };
  function Calender(ele, options) {
    this.$ele = ele;
    var nowDate = new Date();
    this.nowYear = nowDate.getFullYear();
    this.nowMonth = nowDate.getMonth();
    this.yearEnd = this.nowYear;
    this.options = options = $.extend(defaults, options || {});
    this.init();
    return this;
  }
  Calender.prototype = {
    constructor: Calender,
    init: function () {
      this.$ele.html('<input type="text" class="input" placeholder="请选择日期" /><div class="calender"><div class="calender-header"></div><div class="date-wrapper"></div></div>');
      this.render();
      this.bindEvent();
    },
    render: function (val) {
      $('.calender-header').html('<span class="pre"><<</span><span class="index"><span class="year"></span> <span class="month"></span></span> <span class="next">>></span>')
      $('.date-wrapper').html('<div class="header"><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div><div>日</div></div><div class="body"></div>')
      // debugger
      var d = new Date(this.nowYear, this.nowMonth + 1, 0).getDate();
      // 每月第一天
      var temp = new Date(this.nowYear, this.nowMonth, 1);
      var day = temp.getDay();
      if (day == 0) {
        day = 7;
      }
      day--;
      var divHtml = [];
      if (val) {
        var activeDay = val.split('-')[2];
      }
      for (var i = 0; i < d + day; i++) {
        divHtml.push('<div></div>')
      }
      var calenderBody = this.$ele.find('.body')
      calenderBody.html(divHtml.join(""))
      calenderBody.find('div').removeClass('date')
      for (var i = 0; i < d; i++) {
        calenderBody.find('div').eq(i + day).html(i + 1).addClass('date');
        if (i + 1 == activeDay) {
          calenderBody.find('div').eq(i + day).addClass('active-cal')
        }
      }
      this.$ele.find('.year').html(temp.getFullYear() + '年');
      this.$ele.find('.month').html((temp.getMonth() + 1) + '月');
    },
    renderYearList: function () {
      $('.date-wrapper').empty();
      var yearDiv = []
      for (var i = 9; i >= 0; i--) {
        yearDiv.push('<div class="year-list">' + (this.yearEnd - i) + '</div>')
      }
      $('.date-wrapper').html(yearDiv.join(''));
      $('.calender-header').html('<span class="pre-year"><<</span>' + $('.year-list').eq(0).html() + '-' + $('.year-list').eq(9).html() + '<span class="next-year">>></span>');
    },
    bindEvent: function () {
      var _this = this;
      // console.log(this.$ele)
      this.$ele.on('click', '.pre', function (e) {
        $('.date-wrapper').empty()
        _this.nowMonth--;
        if (_this.nowMonth < 0) {
          _this.nowMonth = 11;
          _this.nowYear--;
        }
        _this.render();
        e.stopPropagation()
      })
      this.$ele.on('click', '.next', function (e) {
        $('.date-wrapper').empty();
        _this.nowMonth++;
        if (_this.nowMonth > 11) {
          _this.nowMonth = 0;
          _this.nowYear++;
        }

        _this.render();
        e.stopPropagation()
      })
      this.$ele.find('.input').on('focus', function () {
        _this.render($(this).val())
        _this.$ele.find('.calender').show();
        document.activeElement.blur();
      })
      this.$ele.on('click', '.year', function (e) {
        _this.renderYearList()
        e.stopPropagation()
      })
      this.$ele.on('click', '.month', function (e) {
        _this.$ele.find('.calender-header').html(_this.nowYear);
        var tempHtml = [];
        for (var i = 0; i < 12; i++) {
          tempHtml.push('<div class="month-list">' + (i + 1) + '</div>')
        }
        _this.$ele.find('.date-wrapper').html(tempHtml.join(''));
        e.stopPropagation()
      })
      this.$ele.on('click', '.next-year', function (e) {
        _this.yearEnd = parseInt(_this.yearEnd) + 10;
        _this.renderYearList();
        e.stopPropagation()
      })
      this.$ele.on('click', '.pre-year', function (e) {
        _this.yearEnd = parseInt(_this.yearEnd) - 10;
        _this.renderYearList();
        e.stopPropagation()
      });
      this.$ele.on('click', '.date', function (e) {
        if (!$(e.target).html()) {
          return
        }
        var date = new Date(_this.nowYear, _this.nowMonth);
        var tmpMonth = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        var tmpDate = $(e.target).html() > 9 ? $(e.target).html() : '0' + $(e.target).html();
        _this.$ele.find('.calender').hide();
        _this.$ele.find('.input').val(date.getFullYear() + '-' + tmpMonth + '-' + tmpDate)
      })
      this.$ele.on('click', '.year-list', function (e) {
        _this.yearEnd = _this.$ele.find('.year-list').eq(9).html();
        _this.$ele.find('.date-wrapper').empty();
        _this.nowYear = $(e.target).html();
        _this.$ele.find('.calender-header').html(_this.nowYear);
        var tempHtml = [];
        for (var i = 0; i < 12; i++) {
          tempHtml.push('<div class="month-list">' + (i + 1) + '</div>')
        }
        _this.$ele.find('.date-wrapper').html(tempHtml.join(''));
        e.stopPropagation()
      })
      this.$ele.on('click', '.month-list', function (e) {
        $('.date-wrapper').empty();
        _this.nowMonth = $(e.target).html() - 1;
        _this.render()
        e.stopPropagation()
      })
      $(document).on('click', function (e) {
        if (!$(e.target).parents('.calender').length && !$(e.target).hasClass('input')) {
          _this.$ele.find('.calender').hide()
        }
      })

    },
    getSelectDate:function(){
      return this.$ele.find('.input').val();
    },
    setSelectDate:function(val){
      this.$ele.find('.input').val(val);
    }
  }
  $.fn.calender = function (options) {
    options = $.extend(defaults, options || {});
    return new Calender($(this), options);
  }
})(jQuery);