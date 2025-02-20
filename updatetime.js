const startDate = new Date("2024-08-08T00:00:00");

// ฟังก์ชันคำนวณเวลาที่ผ่านไป
function updateTime() {
    const now = new Date();
    const diff = now - startDate; // คำนวณความต่างของเวลา (มิลลิวินาที)

    // แปลงเวลาเป็นวัน ชั่วโมง นาที วินาที
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // อัปเดตข้อความใน HTML
    document.getElementById("timeElapsed").innerHTML = 
        `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;
}

// อัปเดตเวลาทุก 1 วินาที
setInterval(updateTime, 1000);

// เรียกครั้งแรกเพื่อแสดงผลทันที
updateTime();