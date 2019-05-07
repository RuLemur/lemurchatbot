const manager = require('../chat/twitch-client');
const command_manager = require('../command_manager/command_manager');

module.exports.read_message = function (message) {
    // if (message['msg'].startsWith("!quiz")) {
    //     db.getRandomQuestion().then((data) => manager.sendMessage(data['question']));
    //
    // }

    if (message['msg'].startsWith("!")){
        command_manager.newCommand(message);
    }
};


module.exports.send_message = function (recived_message, send_message) {
    manager.sendMessage(recived_message['channel'], send_message);
}
