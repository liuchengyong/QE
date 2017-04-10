function log(obj) {
    var logs = [];
    for (var key in obj) {
        logs.push('<p>' + key + ':' + obj[key] + '<p>')
    }
    $("#test").html(logs.join(''));
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