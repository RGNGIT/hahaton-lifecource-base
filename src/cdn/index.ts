import SERVER from "./constants";
import Content from "./controllers/content";

const express = require('express');
const cors = require('cors');
const app = express();

const corsOpt = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOpt));

app.post('/cdn' + SERVER.WRITE_FILE, Content.uploadFile);
app.get('/cdn' + SERVER.READ_FILE, Content.getFile);
app.delete('/cdn' + SERVER.CLEAR_CACHE, Content.clearCache);

app.listen(8081, () => { console.log("CDN service has started on 8081."); });