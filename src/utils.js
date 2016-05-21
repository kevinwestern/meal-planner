exports.dateWithoutTime = (date) => new Date(date.getUTCFullYear(), date.getMonth(), date.getDate());
exports.getTodayInSeconds = () => exports.dateWithoutTime(new Date()).getTime();
