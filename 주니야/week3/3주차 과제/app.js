
const fontNameSelector = document.getElementById('select-font-name');
const radios = document.getElementsByName("font-style");
const selectFontFace = document.getElementById("font-family");
const selectFontSize = document.getElementById("font-size");
const saveBtn = document.getElementById('save')
const textInput = document.getElementById('text')
const fileInput = document.getElementById('file')
const eraserBtn = document.getElementById('eraser-btn')
const clearBtn = document.getElementById('Clear-btn');
const modeBtn = document.getElementById('mode-btn');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const canvasWidth = 800;
const canvasHeight = 800;


canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round'
let isPainting = false;
let isFilling = false;
let fontSize = selectFontSize.value
let fontStroke = true;
let fontface = fontNameSelector.value

function onMove(event) {
    if (isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        // fill, stroke 선택할수 있게 
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPaiting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    //ctx.fill();
    ctx.beginPath();
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;

}

function onColorChange(event){
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color; 
    ctx.fillStyle = colorValue;
    ctx.strokeStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if (isFilling){
        isFilling = false;
        modeBtn.innerText = '🖌️채우기';
    } else{
        isFilling = true;
        modeBtn.innerText = '✏️그리기';
    }

}

function onCanvasclick(){
    if (isFilling){
        ctx.fillRect(0,0,canvasWidth, canvasHeight);
    }
}

function onClearClick(){
    if(window.confirm(
        "확인을 누르시면 모든 작업이 취소됩니다."
    ))
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvasWidth, canvasHeight)
    isFilling = false;
    modeBtn.innerText = '🖌️채우기';
}

function onEraserClick(){
    ctx.strokeStyle = 'white';
    isFilling =false;
    modeBtn.innerText = '✏️그리기';
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight)
    fileInput.value = null;
    }
}

function onRadioClick(e) {
    if (e.target.value === "font-style-fill") {
      fontStroke = false;
    } else {
      fontStroke = true;
    }
  }

function FontSizeChange(event){
    fontSize = event.target.value;
}

function onDoubleClick(event){
    ctx.save();
    paintText(event);
    ctx.restore();
  }

function changeFontName(name) {
    console.log(name)
    fontface = name
  }

function paintText(e) {
    const text = textInput.value;
    ctx.lineWidth = 1;
    const selectedStyle = `${fontSize}px '${fontface}'`;
    console.log(selectedStyle)
    ctx.font = selectedStyle;
    if (text !== "" && fontStroke) {
      ctx.strokeText(text, e.offsetX, e.offsetY);
    } else if (text !== "" && !fontStroke) {
      ctx.fillText(text, e.offsetX, e.offsetY);
    }
  }

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement('a')
    a.href = url
    a.download = 'myDrawing.png';
    a.click();
}



canvas.addEventListener('dblclick', onDoubleClick)
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPaiting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasclick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
colorOptions.forEach(color => color.addEventListener('click', onColorClick));
modeBtn.addEventListener('click', onModeClick);
clearBtn.addEventListener('click', onClearClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
selectFontSize.addEventListener("change", FontSizeChange);
radios.forEach((radio) => {
    radio.addEventListener("click", onRadioClick);
  });

fontNameSelector.addEventListener('change', function () {
    changeFontName(this.value);
  });