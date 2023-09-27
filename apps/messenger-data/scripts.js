$(function() {
    $('#content-title').text(data.title);

    let participants_container = $('#participants-content');
    data.participants.forEach((e) => {
        participants_container.append(
            `
            <div class="row">
                <div class="col">
                    ${e.name}    
                </div>
            </div>
            `
        );
    });

    most_common_poster();
    first_message();
    longest_message();
});

function first_message() {
    $('#data-number-of-messages').text(`${data.messages.length} beskeder`);
}

function longest_message() {
    //Sort shortest > longest
    let sorted = data.messages
    .filter((message) => message.content)
    .sort((message1, message2) => message1.content.length - message2.content.length);
    $('#data-longest-message').text(`${sorted[sorted.length - 1].content.length} tegn, ${sorted[sorted.length - 1].content.split(' ').length} ord`);
    $('#data-shortest-message').text(`${sorted[0].content.length} tegn ${sorted[0].content.split(' ').length > 1 ? `, ${sorted[0].content.split(' ').length} ord` : ""}`);
}

function most_common_poster() {
    let inp = $('#most-common-poster-input');
    inp.on('input', function() {
        let searchWord = inp.val();
        let participants_dict = {};

        //Convert participants to a dictionary
        for(const item of data.participants.map(function(e) {
            return e.name;
        })) {
            participants_dict[item] = 0;
        };
        
        data.messages.filter(m => m.content).forEach(message => {
            let word_count = (message.content.match(new RegExp(searchWord, "gi")) || []).length; //Count occurences of word
            participants_dict[message.sender_name] += word_count;
        });

        //Convert dict to list and sort it by word count;
        const sorted_entries = Object.entries(participants_dict);
        sorted_entries.sort((x, y) => y[1] - x[1]);
        console.log(sorted_entries);
    });
}