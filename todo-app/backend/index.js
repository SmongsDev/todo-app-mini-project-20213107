require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// Todo 스키마
const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['높음', '보통', '낮음'], default: '보통' },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true }
);
const Todo = mongoose.model('Todo', todoSchema);

// GET /api/todos — 전체 목록 (최신순)
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// POST /api/todos — 새 Todo 추가
app.post('/api/todos', async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: '제목을 입력해주세요' });
    }
    const todo = new Todo({ title: title.trim(), priority, dueDate: dueDate || null });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// PUT /api/todos/:id — 완료 상태 토글
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { completed, title, priority, dueDate } = req.body;
    const update = {};
    if (completed !== undefined) update.completed = completed;
    if (title !== undefined) update.title = title.trim();
    if (priority !== undefined) update.priority = priority;
    if (Object.prototype.hasOwnProperty.call(req.body, 'dueDate')) update.dueDate = dueDate || null;

    const todo = await Todo.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!todo) return res.status(404).json({ message: 'Todo를 찾을 수 없습니다' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// DELETE /api/todos/:id — 삭제
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo를 찾을 수 없습니다' });
    res.json({ message: '삭제 완료' });
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// DELETE /api/todos — 완료된 항목 전체 삭제
app.delete('/api/todos', async (req, res) => {
  try {
    await Todo.deleteMany({ completed: true });
    res.json({ message: '완료 항목 전체 삭제 완료' });
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// Vercel serverless 함수 호환용 export
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
}

module.exports = app;
