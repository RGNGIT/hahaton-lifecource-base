import SERVER from "./constants";
import Content from "./controllers/content";
import { Router } from "express";

const express = require('express');
const cors = require('cors');

const app = express();
const router = Router();

const corsOpt = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

router.post(SERVER.WRITE_FILE, Content.uploadFile);
router.get(SERVER.READ_FILE, Content.getFile);
router.delete(SERVER.CLEAR_CACHE, Content.clearCache);

app.use(router);
app.use(cors(corsOpt));

app.listen(8081, () => { console.log("CDN service has started on 8081."); });