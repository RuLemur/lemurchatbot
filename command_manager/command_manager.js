const db = require('../db/db_manager');
const message_manger = require('../message_manager/message_manager')
module.exports.newCommand = function (message) {
    db.getCommand(message['msg'], message['channel']).then((action) => {
        recognizeCommand(message, action)
    })
};


function recognizeCommand(message, action) {
    if (action == "say_info"){
        message_manger.send_message(message, action);
    }
}
