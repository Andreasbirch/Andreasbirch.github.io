const getLongestMessage = () => {
    return data.messages
    .filter(message => message.content)
    .reduce(function(prev, curr) {
        return (prev && prev.content.length > curr.content.length) ? prev : curr
    });
}

const getShortestMessage = () => {
    return data.messages
    .filter(message => message.content)
    .reduce(function(prev, curr) {
        return (prev && prev.content.length < curr.content.length) ? prev : curr
    });
}

const drawChatBubble = (elem, text) => {
    $(elem).html(`
    <div class="chat-bubble">
        <p> ${text} </p>
    </div>
    `);
}

const shortest_longest_message_draw = () => {
    drawChatBubble($('#'), getShortestMessage().content);
    drawChatBubble($('#'), getShortestMessage().content);
}