import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'crypto'; // 引入 crypto 模块

const app = express();
const port = 3000;

// 設置中間件
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // 允許的前端應用來源
    credentials: true // 允許跨來源請求攜帶 Cookie
}));

// 生成隨機的 authToken
const generateAuthToken = () => {
    return crypto.randomBytes(64).toString('hex'); // 生成 64 字节的随机数据，并转换为十六进制字符串
};

// 登入路由
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // 模擬用戶驗證
    if (username === 'admin' && password === 'password') {
        // 生成新的身份驗證 Cookies
        const authToken = generateAuthToken();
        res.cookie('authToken', authToken, { httpOnly: true, maxAge: 3600000 }); // 1 小時有效
        res.json({ message: true });
    } else {
        res.status(401).json({ message: '登入失敗' });
    }
});

app.get('/api/check-auth', (req, res) => {
    // 這裡的 authToken 應該與實際存儲的 token 進行比較
    if (req.cookies.authToken) {
        res.status(200).json({ message: true });
    } else {
        res.status(200).json({ message: false });
    }
});

// 登出路由
app.post('/api/logout', (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: '登出成功' });
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});