var bar=document.getElementById('bar');
var n1=document.getElementById("firstValue")
var n2=document.getElementById("secValue")
var n3=document.getElementById("thirdValue")
var n4=document.getElementById("fourthValue")
//color
var col1=document.getElementById('firstColor')
var col2=document.getElementById('secColor')
var col3=document.getElementById('thirdColor')
var col4=document.getElementById('fourthColor')



	var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
var name1=document.getElementById('firstName');
var name2=document.getElementById('secName');
var name3=document.getElementById('thirdName');
var name4=document.getElementById('fourthName');
var number1=document.getElementById('firstValue');
var number2=document.getElementById('secValue');
var number3=document.getElementById('thirdValue');
var number4=document.getElementById('fourthValue');
var color1=document.getElementById('firstColor');
var color2=document.getElementById('secColor');
var color3=document.getElementById('thirdColor');
var color4=document.getElementById('fourthColor');
var polyCheck=document.getElementById('polyCheck')
var myerror=document.getElementById("myerror");
// var myerror2=document.getElementById('noErr')


function validData() {

 if (!(/^[a-zA-Z]/.test(name1.value)&&/^[a-zA-Z]/.test(name2.value)&&/^[a-zA-Z]/.test(name3.value)&&/^[a-zA-Z]/.test(name4.value))) {
     myerror.innerHTML=("<p style='color:red;text-align:center'>data can't be embty and must start with alphabet varters only!</p>")
  return false;
  }

else if(number1.value<=0||number2.value<=0||number3.value<=0||number4.value<=0){myerror.innerHTML=
    ("<p style='color:red;text-align:center'>number of student can't be empty or less than 1!</p>");

    return false;
  }
  else{
 
  myerror.innerHTML=""
    return true;
  }

}
document.getElementById('btn').onclick=function () {
   
    if(validData()){
    if(bar.checked){
    var myVinyls = {
    "name1":n1.value,
    "name2":n2.value,
    "name3":n3.value,
    "name4":n4.value
};
var colors=[col1.value , col2.value, col3.value, col4.value]
var myBarchart = new Barchart(
    {
        canvas:myCanvas,
        padding:10,
        gridScale:5,
        gridColor:"#eeeeee",
        data:myVinyls,
        colors:colors
    }
);
    document.getElementById("emptyCheck").innerHTML=""
    
    myBarchart.draw();
}
if(polyCheck.checked){
    document.getElementById("emptyCheck").innerHTML=""
    
    document.getElementById('mySvg').setAttribute('style','display:in-line');
    polyfn()
}if (checkPie1.checked){
    document.getElementById("emptyCheck").innerHTML=""
   
    drawpie();

}if (checkPie2.checked) {
document.getElementById("emptyCheck").innerHTML="";

    draw()}

}
if (!bar.checked&&!checkPie1.checked&&!checkPie2.checked&&!polyCheck.checked)
 {document.getElementById("emptyCheck").innerHTML="<p style='color:red;text-align:center'>you must at least check on one of the charts</p>"
}else{
    
    var totalValue = Number(number1.value) + Number(number2.value) + Number(number3.value) + Number(number4.value);
    var percentage = [((number1.value/totalValue)*100).toFixed(2), ((number2.value/totalValue)*100).toFixed(2), ((number3.value/totalValue)*100).toFixed(2), ((number4.value/totalValue)*100).toFixed(2)]
    document.getElementById('dataPercent').innerHTML=
    ("<p style='color:white;background-color:"+color1.value+"'>"+course1.value+"  "+percentage[0]+"%</p><p style='color:white;background-color: "+color2.value+"'>"+course2.value+"  "+percentage[1]+"%</p><p style='color:white;background-color: "+color3.value+"'>"+course3.value+"  "+percentage[2]+"%</p><p style='color:white;background-color:"+color4.value+"'>"+course4.value+"  "+percentage[3]+"%</p>")
    // console.log((number1.value/totalValue)*100)
    // console.log(percentage[0])
    document.getElementById("emptyCheck").innerHTML=""
    
}
}
var ctx = myCanvas.getContext("2d");
//drawing grid lines
function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}
//draw rect
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}


//drawing
var Barchart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
  
    this.draw = function(){
        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;
 
        //drawing the grid lines
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
             
            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
 
            gridValue+=this.options.gridScale;
        }
  
        //drawing the bars
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;
 
        for (categ in this.options.data){
            var val = this.options.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );
 
            barIndex++;
        }


  
    }
}


	
