var cv, cx, objetos, objetoActual  = null;
var inicioX = 0, inicioY = 0;
var current_shapes = [];
var current_colors = [];
var current_colors2 = [];
var current_types = [];
var current_types2 = [];
var type_count = {};
var color_count = {};
 

const colors = ["blue", "red", "yellow", "green", "orange", "purple"];
//const colors = ["#2554C7", "#C11B17", "#FFD801", "#6CBB3C", "#F87217", "#571B7E"];
const shapes = ["square", "heart", "triangle", "pentagon", "circle", "star"];

// const GAME_WIDTH = 1200;
// const GAME_HEIGHT = 700;
const GAME_WIDTH = 1400;
const GAME_HEIGHT = 700;


const SHAPE_WIDTH = 40;
const SHAPE_HEIGHT = 40;

const MARGIN = 80;

class Shape {
    constructor(name, color, amount) {
      this.name = name;
      this.color = color;

      this.x = amount % (Math.floor(GAME_WIDTH/(SHAPE_WIDTH*2))) * SHAPE_WIDTH*1.8 + MARGIN;
      this.y = Math.floor(amount/(Math.floor(GAME_HEIGHT/(SHAPE_HEIGHT)))) * 100 + MARGIN;

      this.width = SHAPE_WIDTH ;
      this.height = SHAPE_HEIGHT;
    }

  }

function actualizar() {
  cx.fillStyle = 'transparent'; //#f0f0f0 color de canvas
  cx.fillRect(0, 0, GAME_WIDTH , GAME_HEIGHT);
  cx.clearRect(0, 0, cv.width, cv.height)
  cx.font = "30px sans-serif";
  cx.fillStyle = "black";
  cx.textAlign = "center";
  cx.fillText("Ordena por Forma", cv.width/2, 50);
  // loop to make lines in circle
  var j;
  var k;
  var q_colors = Object.keys(type_count).length;
	var radio = 100;
	var ix = 200;
	var iy = 400;
  var f = Math.PI / n * 2;

  for (j = 0; j < q_colors ; j++) {
    var n = Object.values(type_count)[j];
    var f = Math.PI / n * 2;
    for (k = 0; k < Object.values(type_count)[j]; k++){
      var x2 = radio * Math.cos(k * f) + ix;
      var y2 = radio * Math.sin(k * f) + iy;
      cx.beginPath();
      cx.moveTo(ix, iy);
      cx.lineTo(x2, y2);
      cx.stroke();   
    }
    ix +=250;
  }

 // loop to draw shapes
  for (var i = 0; i < current_shapes.length; i++) {
    //cx.fillStyle = current_shapes[i].color;
    //cx.fillRect(current_shapes[i].x, current_shapes[i].y, current_shapes[i].width, current_shapes[i].height);
    var img = new Image();
    img.src = "./shapes/"+current_shapes[i].name+"_"+current_shapes[i].color+".svg";
    cx.drawImage(img, current_shapes[i].x, current_shapes[i].y , 50, 50);
    
  }



}

//--------------------------------------------------------------------------------------
function drawline1(x1, y1, x2, y2)
{
    if (x1 == x2 && y1 == y2) {
        setPixel(x1, y1);
        return;
    }
    var dx = x2 - x1; var sx = (dx < 0) ? -1 : 1;
    var dy = y2 - y1; var sy = (dy < 0) ? -1 : 1;
    var m = dy / dx;
    var b = y1 - m * x1;

    while (x1 != x2)
    {
        var y = parseInt(Math.round(m*x1 + b));
        setPixel(x1, y);
        x1 += sx;
    }
}
//--------------------------------------------------------------------------------------

window.onload = function() {
  objetos = [];


  cv = document.getElementById('lienzo2');
  cx = cv.getContext('2d');

  amount_col = 0;
  min = 20;
  max = 36;
  var item_shape
  // agregar objetos de prueba
  //let quantity = Math.floor(Math.random() * 36) + 1;
  let quantity = Math.floor(Math.random() * (max - min + 1) + min);
  var i;
   //loop to create random shapes
  for (i = 0; i < quantity; i++) {
    if (amount_col < 5){ 
        item_shape = shapes[Math.floor(Math.random() * shapes.length)];}
    else{
        item_shape = current_types2[Math.floor(Math.random() * current_types2.length)];
    }
    var item_color = colors[Math.floor(Math.random() * colors.length)];
    //var item_shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (!(current_types.includes(item_shape ))){ amount_col+=1; }
    if (!(current_colors2.includes(item_color))){current_colors2.push(item_color); }
    if (!(current_types2.includes(item_shape))){current_types2.push(item_shape); }
    
    let shape = new Shape(item_shape, item_color, current_shapes.length);
    current_shapes.push(shape);
    current_types.push(item_shape);
    current_colors.push(item_color);
    
    // if (!(current_types.includes(item_shape))){current_types.push(item_shape); }
    
    
  };
  current_colors.forEach(function(i) { color_count[i] = (color_count[i]||0) + 1;});
  current_types.forEach(function(i) { type_count[i] = (type_count[i]||0) + 1;});

  console.log(current_shapes);
  console.log(color_count);
  console.log(type_count);
 
  actualizar();

  cv.onmousedown = function(event) {
    for (var i = 0; i < current_shapes.length; i++) {
        if (current_shapes[i].x < event.clientX
          && (current_shapes[i].width + current_shapes[i].x > event.clientX)
          && current_shapes[i].y < event.clientY
          && (current_shapes[i].height + current_shapes[i].y > event.clientY)
        ) {
          objetoActual = current_shapes[i];
          inicioY = event.clientY - current_shapes[i].y;
          inicioX = event.clientX - current_shapes[i].x;
          break;
        }

      }
  }

  cv.onmousemove = function(event) {
    if (objetoActual != null) {
      objetoActual.x = event.clientX - inicioX;
      objetoActual.y = event.clientY - inicioY;
    }
    actualizar();
  }

  cv.onmouseup = function(event) {
    objetoActual = null;
  }
}