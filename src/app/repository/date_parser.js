
const dateparser = {

    secsFromWeekStart(date) {
        return date.getDay()*86400 + date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds()
    }

}

module.exports = dateparser;