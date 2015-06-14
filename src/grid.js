(function() {
  function initialize() {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    var height = document.body.offsetHeight;
    var width = document.body.offsetWidth;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.style.position = 'absolute';
    canvas.style.display = 'none';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.opacity = .2;
    drawGrid(canvas, {
      height: 21,
      width: 21
    });
    document.addEventListener('keyup', toggleCanvas(canvas));
  }

  function drawGrid(canvas, dimensions) {
    var ctx = canvas.getContext('2d');
    var height = canvas.getAttribute('height');
    var width = canvas.getAttribute('width');
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#00f';
    for (var i = dimensions.width - .5; i < width; i += dimensions.width) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (var j = dimensions.height - .5; j < height; j += dimensions.height) {
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.stroke();
    }
  }

  function toggleCanvas(canvas) {
    var toggle = {
      'block': 'none',
      'none': 'block'
    };
    return function(e) {
      if (e.ctrlKey && e.keyCode == 186) {
        canvas.style.display = toggle[canvas.style.display];
      }
    }
  }
  document.addEventListener('DOMContentLoaded', initialize, false);
})();
