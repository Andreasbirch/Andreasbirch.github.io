let form = document.getElementById('submit-chat-form');
let file = document.getElementById('upload');
let dataUpload = {
    participants: [], 
    messages: []
};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Entered submit");

    if (!file.value.length) return;

    for (let i = 0; i < file.files.length; i++) {
        // Create a new FileReader() object
        let reader = new FileReader();

        // Setup the callback event to run when the file is read
        reader.onload = logFile;

        // Read the file
        reader.readAsText(file.files[i]);
        
    }
});

function logFile (event) {
	let json = JSON.parse(event.target.result);

    //Add users, if they don't already exist
    json.participants.forEach(participant => {
        if(!dataUpload.participants.map(p => p.name).includes(participant.name)) {
            dataUpload.participants.push({name: participant.name});
        }
    });
    dataUpload.participants

    //Add message data
    dataUpload.messages = dataUpload.messages.concat(json.messages);
}