const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static("./static"));

app.listen(PORT, err =>{
    if(err){
        console.log("Error occured server not starting");
        return;
    }
    
    console.log(`Server running on http://localhost:${PORT}`);
})