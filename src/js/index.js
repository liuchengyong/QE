var md = window.markdownit();
var cursor = { start: 0, end: 0 };
var x, y; //记录到点击时鼠标到移动框左边和上边的距离

$(function() {
    window.MD = window.markdownit();
    window.QE.init();
    log(QE.cursor);
});



window.QE = {};

$.extend(QE, {
    init: function() {
        QE.ui.reset();
        QE.markCursor();
        QE.contentRender();
        QE.event();
    },
    cursor: { start: 0, end: 0 },
    ui: {
        _title: $('#title'),
        _content: $('#content'),
        _preview: $('#preview'),
        _toolbar: $('#toolbar'),
        reset: function() {
            var height = $('.container').height() - $('.toolbar').outerHeight(true) - $('.container-edit input').outerHeight(true);
            QE.ui._content.css('height', height + 'px');
        }
    },
    contentRender: function() {
        QE.ui._preview.find('.markdown-title').text(QE.ui._title.val() || '无标题文章');
        QE.ui._preview.find('.markdown-body').html(MD.render(QE.ui._content.val()));
    },
    markCursor: function(start,end) {
        QE.cursor = {
            start: start || QE.ui._content[0].selectionStart,
            end: end || QE.ui._content[0].selectionEnd
        };
    },
    selectText:function(start,end){

        QE.ui._content[0].setSelectionRange(start,end);  
        QE.ui._content.focus();  
    },
    insert: function(str) {
        var htmlStr = QE.ui._content.val();
        var ss = htmlStr.substring(0, QE.cursor.start) + str + htmlStr.substring(QE.cursor.end, htmlStr.length);
        console.log({
            str:htmlStr,
            start: QE.cursor.start,
            end:QE.cursor.end,
            statrs: htmlStr.substring(0, QE.cursor.start),
            ends: htmlStr.substring(QE.cursor.end, htmlStr.length)
        });
        
        QE.ui._content.val(ss);
        QE.selectText(QE.cursor.start,QE.cursor.start + str.length);
        QE.contentRender();
        QE.ui._content.focus();  
    },
    clear:function(){
        QE.ui._content.val('');
        QE.ui._content.focus();  
    },
    event: function() {
        // 监听浏览器窗口变化
        $(window).on('resize', function() {
            QE.ui.reset();
        })

        // 监听标题改变
        QE.ui._title.on('input', function() {
            QE.contentRender();
        });

        // 监听内容变化
        QE.ui._content.on('input focus blur change', function(event) {
            QE.markCursor();
            QE.contentRender();
            log(QE.cursor);
        });

        // 监听工具栏 
        QE.ui._toolbar.on('click', function(event) {
            var _li = $(event.target).closest('li');
            if(!_li) return;
            if(_li.hasClass('text_Header')){
                QE.insert('\r### ' + index++);
            }else if(_li.hasClass('text_clear')){
                QE.clear();
            }else if(_li.hasClass('text_test')){
                 QE.insert('\rdadasd\r');
            }
        })
    },

})

var index = 0;

