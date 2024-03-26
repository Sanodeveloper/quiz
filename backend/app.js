const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

require('dotenv').config()
const app = express();

//---------------- database ----------------------------------------------------------------------
const env = process.env

const connectOption = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
}

const connection = mysql.createConnection(connectOption)
connection.connect((err) => {
    if(err) {
        console.log('erro connecting!')
        return;
      }
      console.log('connect success!');
});


//------------ 受信するデータ空っぽ防止 ------------------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookie());

//--------別オリジンからの通信を可能にする-------------------------------
app.use(cors({
    origin: 'https://looquiz.net', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}));

//--------- API ----------------------------------------------------------

app.post('/api/quiz', (req, res) => {
    if(req.body.quiz === 'quizhtml5') {
        connection.query('select * from quizhtml5', (err, result) => {
            res.json(result);
        });
    } else if(req.body.quiz === 'quizcss3') {
        connection.query('select * from quizcss3', (err, result) => {
            res.json(result);
        });
    } else if(req.body.quiz === 'queshtml5') {
        connection.query('select * from queshtml5', (err, result) => {
            res.json(result);
        });
    } else if(req.body.quiz === 'quescss3') {
        connection.query('select * from quescss3', (err, result) => {
            res.json(result);
        });
    }
});

app.post('/api/login', (req, res) => {
    connection.query('select * from users where name=? and pass=? LIMIT 1;', [req.body.name, req.body.pass], (err, result) => {
        if(result.length !== 0) {
            connection.query('select * from session where name=? and pass=? LIMIT 1;', [req.body.name, req.body.pass], (err, result2) => {
                const sessionId = Math.random().toString(32).substring(2);
                if(result2.length !== 0) {
                    connection.query('update session set token = ? where name = ? and pass = ?;', [sessionId, req.body.name, req.body.pass]);
                } else {
                    connection.query('insert into session (name, pass, token) value (?, ?, ?);', [req.body.name, req.body.pass, sessionId]);
                }
                connection.query('select * from usercorrections where name = ?;', [req.body.name], (err, result3) => {
                    const data = {
                        name: req.body.name,
                        pass: req.body.pass,
                        quiz: {
                            html5: {
                                '1':{
                                    '1-1':result3[0].q1,
                                    '1-2':result3[0].q2,
                                    '1-3':result3[0].q3,
                                    '1-4':result3[0].q4,
                                    '1-5':result3[0].q5,
                                },
                                '2':{
                                    '1-1':result3[1].q1,
                                    '1-2':result3[1].q2,
                                    '1-3':result3[1].q3,
                                    '1-4':result3[1].q4,
                                    '1-5':result3[1].q5,
                                },
                                '3':{
                                    '1-1':result3[2].q1,
                                    '1-2':result3[2].q2,
                                    '1-3':result3[2].q3,
                                    '1-4':result3[2].q4,
                                    '1-5':result3[2].q5,
                                },
                            },
                            css3: {
                                '1':{
                                    '1-1':result3[3].q1,
                                    '1-2':result3[3].q2,
                                    '1-3':result3[3].q3,
                                    '1-4':result3[3].q4,
                                    '1-5':result3[3].q5,
                                },
                                '2':{
                                    '1-1':result3[4].q1,
                                    '1-2':result3[4].q2,
                                    '1-3':result3[4].q3,
                                    '1-4':result3[4].q4,
                                    '1-5':result3[4].q5,
                                },
                                '3':{
                                    '1-1':result3[5].q1,
                                    '1-2':result3[5].q2,
                                    '1-3':result3[5].q3,
                                    '1-4':result3[5].q4,
                                    '1-5':result3[5].q5,
                                },
                            },
                        }
                    };
                    res.setHeader('Set-Cookie', ['id=' + sessionId + '; path=/; max-age=' + 3600*24*7 + ';']);
                    res.json([data]);
                });
            });
        } else {
            res.json([]);
        }
    });
});

app.post('/api/session', (req, res) => {
    connection.query('select * from session where token = ?;', [req.body.sessionId], (err, result) =>{
        if(result.length !== 0) {
            connection.query('select * from usercorrections where name = ?;', [result[0].name], (err, result2) => {
                const data = {
                    name: result[0].name,
                    pass: result[0].pass,
                    quiz: {
                        html5: {
                            '1':{
                                '1-1':result2[0].q1,
                                '1-2':result2[0].q2,
                                '1-3':result2[0].q3,
                                '1-4':result2[0].q4,
                                '1-5':result2[0].q5,
                            },
                            '2':{
                                '1-1':result2[1].q1,
                                '1-2':result2[1].q2,
                                '1-3':result2[1].q3,
                                '1-4':result2[1].q4,
                                '1-5':result2[1].q5,
                            },
                            '3':{
                                '1-1':result2[2].q1,
                                '1-2':result2[2].q2,
                                '1-3':result2[2].q3,
                                '1-4':result2[2].q4,
                                '1-5':result2[2].q5,
                            },
                        },
                        css3: {
                            '1':{
                                '1-1':result2[3].q1,
                                '1-2':result2[3].q2,
                                '1-3':result2[3].q3,
                                '1-4':result2[3].q4,
                                '1-5':result2[3].q5,
                            },
                            '2':{
                                '1-1':result2[4].q1,
                                '1-2':result2[4].q2,
                                '1-3':result2[4].q3,
                                '1-4':result2[4].q4,
                                '1-5':result2[4].q5,
                            },
                            '3':{
                                '1-1':result2[5].q1,
                                '1-2':result2[5].q2,
                                '1-3':result2[5].q3,
                                '1-4':result2[5].q4,
                                '1-5':result2[5].q5,
                            },
                        },
                    }
                };
                res.json([data]);
            });
        } else {
            res.json([]);
        }
    });
});

app.post('/api/users', (req, res) => {
    connection.query('select * from users where name = ? and pass = ?;', [req.body.name, req.body.pass], (err, result) => {
        switch(req.body.lec) {
            case '1-1':
                connection.query('update usercorrections set q1 = ? where name = ? and lang = ? and diff = ?', [req.body.num, req.body.name, req.body.lang, req.body.diff]);
                break;
            case '1-2':
                connection.query('update usercorrections set q2 = ? where name = ? and lang = ? and diff = ?', [req.body.num, req.body.name, req.body.lang, req.body.diff]);
                break;
            case '1-3':
                connection.query('update usercorrections set q3 = ? where name = ? and lang = ? and diff = ?', [req.body.num, req.body.name, req.body.lang, req.body.diff]);
                break;
            case '1-4':
                connection.query('update usercorrections set q4 = ? where name = ? and lang = ? and diff = ?', [req.body.num, req.body.name, req.body.lang, req.body.diff]);
                break;
            case '1-5':
                connection.query('update usercorrections set q5 = ? where name = ? and lang = ? and diff = ?', [req.body.num, req.body.name, req.body.lang, req.body.diff]);
                break;
        }
    });
});

app.get('/api/news', (req, res) => {
    connection.query('select * from news', (err, result) => {
        res.json(result);
    });
});

app.post('/api/delete', (req, res) => {
    connection.query('delete from users where name = ? and pass = ?;', [req.body.name, req.body.pass]);
    connection.query('delete from session where name = ? and pass = ?;', [req.body.name, req.body.pass]);
    connection.query('delete from usercorrections where name = ?;', [req.body.name]);
    res.json(true);
});

app.post('/api/sign', [
    check('name', 'ユーザーネームが無効な値です。').isAlphanumeric().escape(),
    check('pass', 'パスワードが無効な値です。').isAlphanumeric().escape()
] ,(req, res) => {
    const error = validationResult(req);
    connection.query('select * from users where name=? and pass=? LIMIT 1;', [req.body.name, req.body.pass], (err, result) => {
        const data = {
            name: req.body.name,
            pass: req.body.pass,
            quiz: {
                html5: {
                    '1': {
                        '1-1':0,
                        '1-2':0,
                        '1-3':0,
                        '1-4':0,
                        '1-5':0,
                    },
                    '2': {
                        '1-1':0,
                        '1-2':0,
                        '1-3':0,
                        '1-4':0,
                        '1-5':0,
                    },
                    '3': {
                        '1-1':0,
                        '1-2':0,
                        '1-3':0,
                        '1-4':0,
                        '1-5':0,
                    },
                },
                css3: {
                    '1': {
                        '1-1':0,
                        '1-2':0,
                        '1-3':0,
                        '1-4':0,
                        '1-5':0,
                    },
                    '2': {
                        '1-1':0,
                        '1-2':0,
                        '1-3':0,
                        '1-4':0,
                        '1-5':0,
                    },
                    '3': {
                        '1-1':0,
                        '1-2':0,
                        '1-3':0,
                        '1-4':0,
                        '1-5':0,
                    },
                }
            }
        };

        if(!error.isEmpty()) {
            const errorLog = error.array().map((values => {
                return values.msg;
            }))
            res.json({error: true, array:errorLog});
        } else {
            if (result.length === 0) {
                connection.query('insert into users (name, pass) value (?, ?);', [req.body.name, req.body.pass]);
                connection.query("insert into usercorrections (name, lang, diff, q1, q2, q3, q4, q5) value (?, 'html5', '1', 0, 0, 0, 0, 0);", [req.body.name]);
                connection.query("insert into usercorrections (name, lang, diff, q1, q2, q3, q4, q5) value (?, 'html5', '2', 0, 0, 0, 0, 0);", [req.body.name]);
                connection.query("insert into usercorrections (name, lang, diff, q1, q2, q3, q4, q5) value (?, 'html5', '3', 0, 0, 0, 0, 0);", [req.body.name]);
                connection.query("insert into usercorrections (name, lang, diff, q1, q2, q3, q4, q5) value (?, 'css3', '1', 0, 0, 0, 0, 0);", [req.body.name]);
                connection.query("insert into usercorrections (name, lang, diff, q1, q2, q3, q4, q5) value (?, 'css3', '2', 0, 0, 0, 0, 0);", [req.body.name]);
                connection.query("insert into usercorrections (name, lang, diff, q1, q2, q3, q4, q5) value (?, 'css3', '3', 0, 0, 0, 0, 0);", [req.body.name]);
                res.json({error: false, array:[data]});
            } else {
                res.json({error: true, array:[]});
            }
        }
    });
});

app.listen(3000, ()=>{
    console.log("Success!");
});
