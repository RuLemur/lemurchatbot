const mysql = require('mysql');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./resources/app.properties');

let conn = mysql.createConnection({
    host: properties.get('db.host'),
    user: properties.get('db.user'),
    password: properties.get('db.password')
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports.getRandomQuestion = function () {
    return new Promise(resolve => {
        let count = 0;
        conn.query("Select count(question) from bot_base.quiz_questions", function (err, res) {
            if (err) throw err;
            count = res["0"]["count(question)"];
            let number = Math.round(Math.random() * count);
            conn.query(`Select question, answer from bot_base.quiz_questions where ID = ${number}`,
                function (err, res) {
                    if (err) throw err;
                    resolve(res[0]);
                })
        })
    })
};

module.exports.getCommand = function (command, channel) {
    console.log(command, channel);
    return new Promise(function (fulfill, reject) {
        conn.query(`Select Action from bot_base.commands where Channel = '${channel}' and Command = '${command}';`,
            function (err, res) {
                if (err) throw err;
                if (res.length !== 0) {
                    fulfill(res[0]["Action"]);
                }
            });
    })
};


// CSV PARSER

// const fs = require('fs');
// const csv = require('csv-parser');
//

// fs.createReadStream('./quiz.csv' )
//     .pipe(csv({ separator: ';' }))
//     .on('data', function(data){
//         try {
//             //perform the operati
//             addQuestion(data['question'].toLowerCase().trim(),data['answer'].toLowerCase().trim())
//         }
//         catch(err) {
//             //error handler
//         }
//     })
//     .on('end',function(){
//         //some final operation
//     });

// function addQuestion(question, answer){
//     conn.query(`insert into bot_base.quiz_questions (question, answer) values ('${question}', '${answer}')`,
//         function (err, res) {
//             if (err) console.log(question, answer);
//             // console.log(res);
//
//         } )
// }