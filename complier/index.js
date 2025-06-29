const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post ('/run', (req, res) => {
    const { code, language= 'cpp' } = req.body;
    if(code === undefined) {
        return res.status(400).json({ error: 'Code is required' });
    }
    console.log(`Running code in ${language}: ${code}`);
    res.json({
        message: 'Code executed successfully',
    });
});
app.listen(8000, () => {    
  console.log('Server is running on http://localhost:8000');
});