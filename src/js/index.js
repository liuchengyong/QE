var md = window.markdownit();
var cursor = { start: 0, end: 0 };
var x, y; //记录到点击时鼠标到移动框左边和上边的距离

$(function() {


    // var result = md.render('# markdown-it rulezz!');


    var height = $('.container').height() - $('.toolbar').outerHeight(true) - $('.container-edit input').outerHeight(true);
    $('#content').css('height', height + 'px');
    $('#preview .markdown-title').text($('#title').val() || '无标题文章');

    $('#title').on('input', function() {
        $('#preview .markdown-title').text($(this).val() || '无标题文章');
    })

    $('#content').on('input focus blur change', function(event) {
        cursor = {
            start: this.selectionStart,
            end: this.selectionEnd
        };
        if (event.type == 'input') $('#preview .markdown-body').html(md.render($(this).val()));
        log(cursor);
    });

    $('.toolbar').on('click', function(event) {
        var $li = $(event.target).closest('li');
        if (!$li) return;
        if ($li.hasClass('uploadImage')) {
        	 $('#content').val(insertHtml('\r![asdasd](http://k73.com/up/allimg/120906/22-120Z6140234L9.jpg)\r'))
        }
    });
});

function insertHtml(str){
	// tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
	var htmlStr =  $('#content').val()
	return htmlStr.substring(0, cursor.start) + str + htmlStr.substring(cursor.end, htmlStr.length);
}

document.addEventListener('drop', function(event) {
    $('#test').css({
        left: (event.pageX - x) + 'px',
        top: (event.pageY - y) + 'px'
    })
    event.preventDefault() || event.stopPropagation();
}, false);
document.addEventListener('dragover', function(event) {
    event.preventDefault() || event.stopPropagation();
}, false);
document.getElementById('test').addEventListener('dragstart', function(event) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text", ''); //附加数据，　没有这一项，firefox中无法移动
    x = event.offsetX || event.layerX;
    y = event.offsetY || event.layerY;
    return false;
}, false);

function log(obj) {
    var logs = [];
    for (var key in obj) {
        logs.push('<p>' + key + ':' + obj[key] + '<p>')
    }
    $("#test").html(logs.join(''));
}
