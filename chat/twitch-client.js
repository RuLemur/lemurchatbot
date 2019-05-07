const tmi = require('tmi.js')
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader('./resources/app.properties');
const message_manager = require('../message_manager/message_manager');

const opts = {
    identity: {
        username: properties.get('twitch.username'),
        password: properties.get('twitch.password')
    },
    channels: [
        'LeMuR_Ru'
    ]
};

const client = new tmi.client(opts);


client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot
    let message = convertToMessage(target, context, msg);
    message_manager.read_message(message);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function addStream(streamName) {
    //TODO: add exception handler
    client.join(streamName);
}

function convertToMessage(target, context, msg) {
    let message = []
    message['channel'] = target.replace("#", "");
    // message['display-name'] = context['display-name'];
    message['user_name'] = context['user_name'];
    // message['message-type'] = context['message-type'];
    // message['is-moderator'] = context['mod'];
    // message['is-subscriber'] = context['subscriber'];
    message['msg'] = msg;
    return message;
}

//TODO: convert to send queue
module.exports.sendMessage = function (message, channel = "lemur_ru") {
    client.say('#' + channel, message)
};