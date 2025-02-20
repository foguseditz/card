var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];
var img = new Image();
img.src = "muah.png"; // เปลี่ยนเป็น "muah.jpg" ถ้าเป็นไฟล์ JPG

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");



function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}
// วันที่เริ่มต้น (8 สิงหาคม 2024)
const startDate = new Date("2024-08-08T00:00:00");

function updateElapsedTime() {
    
    const now = new Date();
    const diff = now - startDate; // คำนวณความต่างของเวลา (มิลลิวินาที)

    // แปลงเวลาเป็น วัน ชั่วโมง นาที วินาที
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;
}

function drawElapsedTime() {
    var fontSize = Math.min(24, window.innerWidth / 30);
    context.font = fontSize + "px Arial";
    context.textAlign = "center";
    context.fillStyle = "rgba(165, 157, 132, 1)"; // ใช้สี A59D84

    var timeString = updateElapsedTime();
    context.fillText("เราเจอกันวันนี้ก็:", canvas.width / 2, 100);
    context.fillText(timeString, canvas.width / 2, 130);
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgba(165, 157, 132, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if(frameNumber < 250){
        drawElapsedTime();
    }
    //fades out the text by decreasing the opacity
    if(frameNumber >= 250 && frameNumber < 500){
        drawElapsedTime();
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 500){
        opacity = 0;
    }
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["เค้าขอโทษที่ช่วงนี้ทำให้รู้สึกว่าเราห่างเหินกัน"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("เค้าขอโทษที่ช่วงนี้ทำให้รู้สึกว่าเราห่างเหินกัน", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["เค้าขอโทษที่ช่วงนี้ทำให้รู้สึกว่าเค้าใส่ใจน้อยลง"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("เค้าขอโทษที่ช่วงนี้ทำให้รู้สึกว่าเค้าใส่ใจน้อยลง", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 1000){
        opacity = 0;
    }
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;
        context.fillText("ขอโทษที่ทำให้รู้สึกว่าเราไม่หวานกันเหมือนเมื่อก่อน", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;
        context.fillText("ขอโทษที่ทำให้รู้สึกว่าเราไม่หวานกันเหมือนเมื่อก่อน", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 1500){
        opacity = 0;
    }
    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;
        context.fillText("เค้ายังยืนยันคำเดิมครับเค้ารักเบ้บนะคั้บรักมากกกกกกเยยด้วยย", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;
        context.fillText("เค้ายังยืนยันคำเดิมครับเค้ารักเบ้บนะคั้บรักมากกกกกกเยยด้วยย", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2000){
        opacity = 0;
    }
    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["เค้าดีใจที่มีเบ้บในทุกๆวันนะคั้บอยากตื่นมาเจอเบ้บทุกวันเยยย"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("เค้าดีใจที่มีเบ้บในทุกๆวันนะคั้บอยากตื่นมาเจอเบ้บทุกวันเยยย", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgba(193, 186, 161, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["เค้าสัญญาว่าเค้าจะทำให้ดีกว่านี้ครับ"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("เค้าสัญญาว่าเค้าจะทำให้ดีกว่านี้ครับ", canvas.width/2, canvas.height/2);
        }
        
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2500){
        opacity = 0;
    }

    
    
    if(frameNumber >= 2500 && frameNumber < 99999){
        context.fillStyle = `rgba(193, 186, 161, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["พรุ่งนี้เจอกานนไปกินข้าวกันคั้บบพาเก๋าาๆไปทำสปาาแน้วก็ไปตัดลูกกะตาใหม่ให้เค้าด้วยยกันคั้บเบ้บช่วยเค้าเลือกด้วยยนะะ🥺"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
          
           
           
        } else {
           
            context.fillText("พรุ่งนี้เจอกานนไปกินข้าวกันคั้บบพาเก๋าาๆไปทำสปาาแน้วก็ไปตัดลูกกะตาใหม่ให้เค้าด้วยยกันคั้บเบ้บช่วยเค้าเลือกด้วยยนะะ🥺", canvas.width/2, canvas.height/2);
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if(frameNumber >= 3000 && frameNumber < 99999){
      context.fillStyle = `rgba(193, 186, 161, ${thirdOpacity})`;
        context.fillText("ปล. เค้ามีอะไยให้ด้วยแหยะะะพรุ่งนี้ รักนะคั้บบ อยากเจออแน้ววววว", canvas.width / 2, (canvas.height / 2 + 120));

        thirdOpacity += 0.01;

        // แสดงรูปภาพที่ตำแหน่งกำหนด
        var imgWidth = 150; // กำหนดความกว้างของรูป
        var imgHeight = 150; // กำหนดความสูงของรูป
        var imgX = (canvas.width / 2) - (imgWidth / 2); // วางรูปตรงกลาง
        var imgY = canvas.height / 2 + 150; // วางรูปใต้ข้อความ

        context.globalAlpha = thirdOpacity; // ใช้ opacity เดียวกับข้อความ
        context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        context.globalAlpha = 1; // รีเซ็ตค่า opacity
    }   

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});



window.requestAnimationFrame(draw);
