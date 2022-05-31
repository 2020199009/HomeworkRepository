const express = require("express");
const app = express();
app.use(express.static("public"));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.listen(8080);

app.get("/public/product.json",function (req,res) {
    console.log(req.query);

    if(!req.query?.file) {
        res.status(400).send("400 error! file이 query parameters에 없습니다.");
        return;
    }
    fs.readFile("/public/produc.json", "utf-8", async function(error, data) {
        if (error) {
            if(error.code === "ENOENT") {
                res.status(404).send("${req.query.file}이 없습니다.");
            } else {
            res.status(500).send("500 error!");
            }
        } else {
            res.status(200).send(data.toString());
        }
    });
});