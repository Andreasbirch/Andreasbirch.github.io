$('#activity-selector').change(function(e) {
    let activityScope = $(e.target).val();
    let activityData = [];
    switch (activityScope) {
        case 'daily':
            activityData = activityDaily();
            break;
        case 'weekly':
            activityData = activityWeekly();
            break;
        case 'monthly':
            activityData = activityMonthly();
            break;
        case 'yearly':
            activityData = activityYearly();
            break;
        default:
            activityData = activityDaily();
            break;
    }
    console.log("Activity data", activityData);
})
const counts = (format) => {
    var cts = data.messages.reduce((p, c) => {
        var time = timeFormat(c.timestamp, format);
        if (!p.hasOwnProperty(time)) {
            p[time] = 0;
        }
        p[time]++;
        return p;
    }, {});
    console.log(cts);
}

const timeFormat = (timestamp, format) => {
    let date = new Date(timestamp);
    switch (format) {
        case 'hour':
            return dayNumToName(date.getHours());
        case 'day':
            return dayNumToName(date.getDay());
        case 'date':
            return dayNumToName(date.getDate());
        case 'month':
            return monthNumToName(date.getMonth());
        default:
            break;
    }
}

const dayNumToName = (num) => {
    switch (num) {
        case 0:
            return "Mandag"
        case 1:
            return "Tirsdag"
        case 2:
            return "Onsdag"
        case 3:
            return "Torsdag"
        case 4:
            return "Fredag"
        case 5:
            return "Lørdag"
        case 6:
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