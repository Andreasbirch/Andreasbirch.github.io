const getNumOfMessages = () => {
    return data.messages.length;
}

const getNumOfParticipants = () => {
    return data.participants.length;
}

const getMessagesForUser = (user) => {
    return data.messages.filter(e => e.sender_name == user);
}

const getMessagesForUsers = () => {
    return data.participants.map(function (user) {
        return {
            user: user.name,
            messages: getMessagesForUser(user.name)
        }
    })
}

let messagesForUsersChart;
const drawMessagesForUsers = (ctx) => {
    if (messagesForUsersChart) messagesForUsersChart.destroy();

    //Add average
    let messageCountForUsers = getMessagesForUsers().map((e) => {
        return {
            user: e.user,
            message_count: e.messages.length
        }
    });
    
    messageCountForUsers.push({
        user: "Average",
        message_count: getNumOfMessages() / getNumOfParticipants() 
    });

    messageCountForUsers.sort(function(a, b) {
        return b.message_count - a.message_count; //Order descending by message count;
    });

    console.log("Messages ordered by count", messageCountForUsers);

    messagesForUsersChart = new Chart(ctx, {
        type: 'bar',
        data: {
            // labels: ['A', 'B', 'C', 'D'],
            labels: messageCountForUsers.map(function(entry) {
                return entry.user;
            }),
            datasets: [
                {
                    axis: 'y',
                    label: '# of messages',
                    // data: [1, 2, 3, 4],
                    data: messageCountForUsers.map(function(entry) {
                        return entry.message_count;
                    }),
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}