const http=require("http");
const fs=require("fs");

const myserver=http.createServer((req,res)=>
{
    const log=`${Date.now()}:${req.url} New req recived\n`;
    fs.appendFile('log.txt',log,(err,data)=>
    {
       if(req.url=='/')
       {
        res.end("Homepage");
       }
       else if(req.url=='/About')
       {
        res.end("About page");
       }
    })
console.log("new request recived");

});

myserver.listen(8000,()=>
{
    console.log("server started");
})