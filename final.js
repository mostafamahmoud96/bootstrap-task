var pieChartCanvas = document.getElementById("pieCanvas")
pieChartCanvas.width= 300 ;
pieChartCanvas.height = 300 ;

var barChartCanvas = document.getElementById("barCanvas")
barChartCanvas.width= 300 ;
barChartCanvas.height = 300 ;
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");

function myFunction() {

    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if(firstName.value == format ||firstName.value=="" ||secName.value == format ||secName.value==""||thirdName.value == format ||thirdName.value==""||fourthName.value == format ||fourthName.value=="" )
   {
       p1.innerHTML="*Data input Don't allowed to be empty and must start with alphabet letters"
       p2.innerHTML="*You must at least check on one of the charts" 
    }
    
    if (document.getElementById("pieChart").checked && document.getElementById("doughnutChart").checked){
     draw();
     ddraw();
    }
if (document.getElementById("pieChart").checked) {
 draw();
 }
 
if (document.getElementById("doughnutChart").checked) {
 ddraw();
   }
    if (document.getElementById("barChart").checked) {
         barChart();
     }
     if (document.getElementById("lineChart").checked) {
         lineChart();
     }
    
}


var btnDraw = document.getElementById("btnDraw");
btnDraw.addEventListener("click",myFunction)
var firstName = document.getElementById("firstName");
var firstValue = document.getElementById("firstValue");
var firstColor = document.getElementById("firstColor");

var secName = document.getElementById("secName");
var secValue = document.getElementById("secValue");
var secColor = document.getElementById("secColor");

var thirdName = document.getElementById("thirdName");
var thirdValue = document.getElementById("thirdValue");
var thirdColor = document.getElementById("thirdColor");

var fourthName = document.getElementById("fourthName");
var fourthValue = document.getElementById("fourthValue");
var fourthColor = document.getElementById("fourthColor");

var dataCanvas=document.getElementById("canvasData");

var pieChart = function(currChartCanvas,dataDraw){
    this.dataDraw=dataDraw;
    this.canvas = currChartCanvas;
    this.ctx = this.canvas.getContext("2d")
    var subName =[
       firstName.value,
        secName.value,
        thirdName.value,
        fourthName.value,
    ]
    var subValues ={
        
        "first value":firstValue.value,
        "second value":secValue.value,
        "third value":thirdValue.value,
        "fourth value":fourthValue.value,
    }
    var subColors=[
        firstColor.value,
        secColor.value,
        thirdColor.value,
        fourthColor.value,
    ]
    var total= Number (firstValue.value) + Number (secValue.value) +Number (thirdValue.value)+Number (fourthValue.value)
    var percentage=[(firstValue.value/total)*100,(secValue.value/total)*100,(thirdValue.value/total)*100,(fourthValue.value/total)*100]
    this.drawData = function(){
        var dataArea="";
        for (var temp=0; temp<4 ; temp++){
            dataArea += "<div><span style='display:inline-block;width:20px;background-color:"+subColors[temp]+";'>&nbsp; </span>"+ subName[temp]+""+percentage[temp]+"%</div>";
        }
         this.dataDraw.innerHTML= dataArea;
    }

    this.drawArc = function(){
        var totalValues =0;
        var colorIndex = 0;
        for(var obj in subValues){
            var eachValue = Number(subValues[obj]);
            totalValues += eachValue;
        }
        var startAngel =0;
        for (var objValue in subValues){
            var angelvalue = subValues[objValue];
            var eachAngelValue = 2*Math.PI * angelvalue / totalValues;
            var eachAngelColor = subColors[colorIndex];
            colorIndex +=1;

            this.drawArcData(this.ctx,this.canvas.width/2,this.canvas.height/2,this.canvas.width/2,startAngel,startAngel+ eachAngelValue,eachAngelColor)
        startAngel += eachAngelValue;
    }

    }
    this.drawArcData= function(ctx,centerX,centerY,radius,startAngel,endAngel,color){
    var ctx=pieChartCanvas.getContext("2d")
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX,centerY, radius, startAngel, endAngel);
    ctx.closePath();
    ctx.fill();
    }
this.drawArcc = function(){
        var totalValues =0;
        var colorIndex = 0;
        for(var obj in subValues){
            var eachValue = Number(subValues[obj]);
            totalValues += eachValue;
        }
        var startAngel =0;
        for (var objValue in subValues){
            var angelvalue = subValues[objValue];
            var eachAngelValue = 2*Math.PI * angelvalue / totalValues;
            var eachAngelColor = subColors[colorIndex];
            colorIndex +=1;

            this.drawArccData(this.ctx,this.canvas.width/2,this.canvas.height/2,this.canvas.width/2,startAngel,startAngel+ eachAngelValue,eachAngelColor)
        startAngel += eachAngelValue;
    }

    }
    this.drawArccData= function(ctx,centerX,centerY,radius,startAngel,endAngel,color){
        var ctx=barChartCanvas.getContext("2d")
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.arc(centerX,centerY, radius, startAngel, endAngel);
        ctx.closePath();
        ctx.fill();

    var ctx=barChartCanvas.getContext("2d")
    ctx.fillStyle="white";
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX,centerY, radius/2, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
    }
}
function draw(){
    var pieChartobj = new pieChart (pieChartCanvas, dataCanvas);
    pieChartobj.drawArc();
    pieChartobj.drawData();
}


function ddraw(){
    var pieChartobj = new pieChart (barChartCanvas, dataCanvas);
    pieChartobj.drawArcc();
    pieChartobj.drawData();
}

// google.charts.load('current', { 'packages': ['corechart'] });

// function barChart() {
//     var sum = parseInt(firstValue.value) + parseInt(secValue.value) + parseInt(thirdValue.value) + parseInt(fourthValue.value);
//     var x1 = parseInt(firstValue.value) * 100 / sum;
//     var x2 = parseInt(secValue.value) * 100 / sum;
//     var x3 = parseInt(thirdValue.value) * 100 / sum;
//     var x4 = parseInt(fourthValue.value) * 100 / sum;


//     var data = {
//         rows: [
//             [firstName.value, x1],
//             [secName.value, x2],
//             [thirdName.value, x3],
//             [fourthName.value, x4]

//         ]
//     };
//     var chart = anychart.column();
//     chart.data(data);
//     var options = { 'width': 250, 'height': 200 };
//     chart.container("container");
//     chart.draw(options);
// }

// function lineChart() {
//     var sum = parseInt(firstValue.value) + parseInt(secValue.value) + parseInt(thirdValue.value) + parseInt(fourthValue.value);
//     var x1 = parseInt(firstValue.value) * 100 / sum;
//     var x2 = parseInt(secValue.value) * 100 / sum;
//     var x3 = parseInt(thirdValue.value) * 100 / sum;
//     var x4 = parseInt(fourthValue.value) * 100 / sum;

//     console.log(x1);
//     console.log(x2);
//     console.log(x3);
//     console.log(x4);
//     var chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,
//         theme: "light2",
//         title: {
//             text: "Simple Line Chart"
//         },
//         data: [{
//             type: "line",
//             indexLabelFontSize: 16,
//             dataPoints: [
//                 { y: x1 },
//                 { y: x2 },
//                 { y: x3 },
//                 { y: x4 }
//             ]
//         }]
//     });
    chart.render();










 
 
 
 
 