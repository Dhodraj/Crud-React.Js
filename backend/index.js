const express = require("express");
const app= express();
const mysql = require("mysql");
const cors = require('cors')

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crud",
    port: 3305,
}); 
db.connect();


app.post("/create",(req,res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const mail = req.body.mail;

    db.query('SELECT * FROM data WHERE mail=?',[mail],(err,result)=>{
        if(result.length>0){
            res.send({message:"Email already exist"});
            res.end();
        }else{
            db.query('INSERT INTO data (fname,lname,mail) VALUES (?,?,?)', 
    [fname,lname,mail],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send({message: "Values inserted"});
            console.log("sup")
            res.end();
        }
    }
    );
            
        }
    })

})

// app.post("/create" ,(req,res) =>{
//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const mail = req.body.mail;

//    db.query('INSERT INTO data (Firstname,Lastname,Email) VALUES (?,?,?)', 
//     [fname,lname,mail],
//     (err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send({message: "values inserted"});
//             console.log("sup")
//             res.end();
//         }
//     }
//     );
// });


app.get('/details',(req,res)=>{

    db.query('SELECT * FROM data',(err,result)=>{
        if(result.length>0){
            console.log(result);
            res.send(result);
            res.end();
        }
    })
})

app.put("/updatefname",(req,res)=>{
    const id=req.body.id;
    const fname = req.body.fname;
    console.log(fname);
    if(fname.length>0)
    {
    db.query(
        "UPDATE data SET fname= ? WHERE id= ?",
        [fname, id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result);
                res.send(result);
            }
        }
    );
}
});

app.put("/updatelname",(req,res)=>{
    const id=req.body.id;
    const lname = req.body.lname;
    console.log(lname);
    if(lname.length>0)
    {
        db.query(
            "UPDATE data SET lname= ? WHERE id= ?",
            [lname, id],
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    res.send(result);
                }
            }
        );
    }
});

app.put("/updatemail",(req,res)=>{
    const id=req.body.id;
    const mail = req.body.mail;
    console.log(mail);
    if(mail.length>0)
    {
    db.query(
        "UPDATE data SET mail= ? WHERE id= ?",
        [mail, id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result);
                res.send(result);
            }
        }
    );
    }
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM data WHERE id=?",id,(err,result)=>{
        if(err){
            console.log(error);
        }else{
            res.send(result);
        }
    }
    )
})

app.listen(3005,() => {
    console.log("Working in 3005");
})