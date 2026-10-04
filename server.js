const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware kiểm tra age
const checkAge = (req, res, next) => {
    const { age } = req.query;

    // Kiểm tra nếu thiếu age hoặc không phải số hợp lệ
    if (!age || isNaN(age)) {
        return res.status(400).json({ error: 'Vui lòng cung cấp tham số age hợp lệ!' });
    }

    const numAge = parseInt(age, 10);

    if (numAge < 18) {
        // Nếu age < 18, trả về lỗi và không cho request đi tiếp
        return res.status(403).json({ error: 'Bạn chưa đủ 18 tuổi, không được phép truy cập!' });
    }

    // Nếu age >= 18, tiếp tục xử lý
    next();
};

// Route Handler GET /api/info (áp dụng middleware checkAge)[cite: 1]
app.get('/api/info', checkAge, (req, res) => {
    const { name, age } = req.query;

    // Lấy name và age từ Query String và trả về response[cite: 1]
    res.status(200).json({
        message: 'Thành công!',
        name: name || 'Ẩn danh',
        age: parseInt(age, 10)
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});