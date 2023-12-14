$('#activity-selector').change(function(e) {
    let activityScope = $(e.target).val();
    if(activityScope != 'none') {
        let activities = activity(activityScope);
        let a = Object.keys(activities).map(element => {
            return {
                x: element,
                y: activities[element]
            }
        });
        drawHorizontalGraph(document.getElementById('messages-activity-container'), a);
    }
});

function activity(format) {
    let bins = getBins(format);
    data.messages.forEach((e) => {
        let bin = getBinForTime(e.timestamp, format);
        if(bins[bin]) {
            bins[bin] += 1;
        } else {
            bins[bin] = 1;
        }
    });
    return bins;
}

const getBinForTime = (timestamp, format) => {
    let date = new Date(timestamp);
    switch (format) {
        case 'daily':
            return date.getHours();
        case 'weekly':
            return dayNumToName(date.getDay());
        case 'monthly':
            return date.getDate();
        case 'yearly':
            return monthNumToName(date.getMonth());
        default:
            break;
    }
}

const getBins = (format) => {
    let bins = [];
    switch (format) {
        case 'daily':
            bins = Array.from({length: 24}, (_, i) => i + 1);
            break;
        case 'weekly':
            bins = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag']
            break;
        case 'monthly':
            bins = Array.from({length: 31}, (_, i) => i + 1)
            break;
        case 'yearly':
            bins = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December']
            break;
        default:
            break;
    }
    let out = {}
    bins.forEach((e) => {
        out[e] = 0;
    });
    return out;
}

const dayNumToName = (num) => {
    switch (num) {
        case 1:
            return "Mandag"
        case 2:
            return "Tirsdag"
        case 3:
            return "Onsdag"
        case 4:
            return "Torsdag"
        case 5:
            return "Fredag"
        case 6:
            return "Lørdag"
        case 7:
            return "Søndag"
        default:
            break;
    }
}

const monthNumToName = (num) => {
    switch (num) {
        case 0:
            return "Januar"
        case 1:
            return "Februar"
        case 2:
            return "Marts"
        case 3:
            return "April"
        case 4:
            return "Maj"
        case 5:
            return "Juni"
        case 6:
            return "Juli"
        case 7:
            return "August"
        case 8:
            return "September"
        case 9:
            return "Oktober"
        case 10:
            return "November"
        case 11:
            return "December"
        default:
            break;
    }
}