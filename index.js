const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const { Client } = require('figma-api');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Figma API配置
const figmaConfig = {
  channel: 'uglsshak'
};

// 初始化Figma客户端
let figmaClient = null;

// 静态文件服务
app.use(express.static(__dirname));

// 主页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Figma连接接口
app.post('/api/figma/connect', (req, res) => {
  const { personalAccessToken } = req.body;
  
  try {
    figmaClient = new Client({ personalAccessToken });
    res.json({ success: true, message: '已成功连接到Figma' });
  } catch (error) {
    res.status(500).json({ success: false, message: '连接Figma失败', error: error.message });
  }
});

// Socket.io连接
io.on('connection', (socket) => {
  console.log('新客户端连接');
  
  // 通过channel与Figma通信
  socket.on('figma:message', (data) => {
    console.log('收到Figma消息:', data);
    // 在这里处理来自Figma的消息
    
    // 发送响应回Figma
    socket.emit('figma:response', { 
      channel: figmaConfig.channel,
      message: '收到消息',
      data: data 
    });
  });
  
  socket.on('disconnect', () => {
    console.log('客户端断开连接');
  });
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`Figma通信频道: ${figmaConfig.channel}`);
}); 