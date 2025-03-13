const express = require("express");
var CecController = require('cec-controller');
var cecCtl = new CecController();

const app = express();
let controller = null;
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send(controller.dev0.powerStatus);
});

app.post("/", async (req, res) => {
    let state = req.body.state;

    if ([null, undefined].includes(state) || typeof state !== "boolean")
        return res.status(400).send("Invalid state");

    if (state)
        await controller.dev0.turnOn()
    else
        await controller.dev0.turnOff()

    res.status(200).send("OK");
});

cecCtl.on('ready', (ctrl) => {
    controller = ctrl;
    app.listen(8000);
});
cecCtl.on('error', console.error);