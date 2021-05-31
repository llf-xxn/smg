var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"123456",
  database:"student"
});
connection.connect()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/说明', function(req, res, next) {
  res.render('说明');
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/error', function(req, res, next) {
  res.render('error');
});

router.get('/services', function(req, res, next) {
  res.render('services');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/back2', function(req, res, next) {
  res.render('back2');
});
router.get('/data-visualization2', function(req, res, next) {
  res.render('data-visualization2');
});
router.get('/index2', function(req, res, next) {
  res.render('index2');
});
router.get('/login2', function(req, res, next) {
  res.render('login2');
});
router.get('/maps2', function(req, res, next) {
  res.render('maps2');
});
router.get('/preferences2', function(req, res, next) {
  res.render('preferences2');
});
router.get('/index4', function(req, res, next) {
  res.render('index4');
});
router.get('/index3', function(req, res, next) {
  connection.query('SELECT * FROM manage',(err,result)=>{
    if(err){
      console.log(err);
      return
    }
    // console.log(result);
     res.render('index3',{data:result});
  })
 
});

router.get('/update',function(req,res){
  connection.query('SELECT * FROM manage WHERE id = ?',req.query.id,function(err,result){
    res.render('index5',{
      id:result[0].id,
      name:result[0].name,
      price:result[0].price,
      sale:result[0].sale,
      address:result[0].address
    })
  })
})

router.get('/del', function(req, res, next) {
  connection.query("delete from manage where id = ?",req.query.id,(err,data)=>{
    if (err){
      console.log(err);
      res.end("failure")
    }else{
      res.redirect("/index3")
    }
  })
});

router.post('/register', function(req, res, next) {
  connection.query("insert into register(username,email,password) values(?,?,?)",[req.body.account,req.body.email,req.body.password],(err,data)=>{
    if (err){
      console.log(err);
      res.end("failure")
    }else{
      res.redirect("/register")
    }
  })
});
router.post('/login', function(req, res, next) {
  connection.query("select * from register where username=? and password=?",[req.body.account,req.body.password],(err,data)=>{
    if (err){
      res.end("failure")
    }else{
      if(data.length>0){
        res.redirect("/")
      }else{
        res.end("failure")
      }
    }
  })
});

router.post('/index3',function(req,res){
  let body = req.body
  connection.query('INSERT INTO manage values(null,?,?,?,?)',[body.name,body.price,body.sale,body.address],function(err,result){
    res.redirect('/index3')
  })
})

router.post('/index5',function(req,res){
  let body = req.body
  connection.query('UPDATE manage SET name = ? , price = ?,sale = ?,address =? WHERE id = ?',[body.name,body.price,body.sale,body.address,req.query.id],function(err,result){
    res.redirect('/index3') 
     
  })
})

module.exports = router;
