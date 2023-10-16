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

const activityDaily = () => {
    let hourBins = new Array(24)
    for (let i = 0; i < hourBins.length; i++) {
        hourBins[i] = {
            time: i, 
            count: data.messages.filter(e => new Date(e.timestamp).getHours() == i).length
        }
    }
    return hourBins;
}

const activityWeekly = () => {
    let dayBins = new Array(7);
    for (let i = 0; i < dayBins.length; i++) {
        dayBins[i] = {
            day: dayNumToName(i), //Todo: converter til dag, helst uden switch 
            count: data.messages.filter(e => new Date(e.timestamp).getDay() == i).length
        }
    }
    return dayBins;
}

const activityMonthly = () => {
    let dayBins = new Array(31);
    for (let i = 0; i < dayBins.length; i++) {
        dayBins[i] = {
            day: i + 1,
            count: data.messages.filter(e => new Date(e.timestamp).getDate() == i).length
        }
    }
    return dayBins;
}

const activityYearly = () => {
    let monthBins = new Array(12);
    for (let i = 0; i < monthBins.length; i++) {
        monthBins[i] = {
            month: monthNumToName(i),
            count: data.messages.filter(e => new Date(e.timestamp).getMonth() == i).length
        }
    }
    return monthBins;
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