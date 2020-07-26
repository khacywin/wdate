/*****
 * DATE
 * Functions for date
 * @param {YYYY-MM-DD | MM-DD-YYYY | object} date - object date | string can convert to object date 
 * @param {number} month - format follow of date object [0-11]
 * @param {number} week - format follow of date object
 */

const data_month = require('./month.json');
const data_weekday = require('./weekday.json');

/**
 * TODO
 * Get month format full
 * 
 * @param {number} month
 * @param {'vi' | 'en'} region
 */
const getMonthFull = (month, region = 'en') => {
    return data_month['full'][month][region];
}
exports.getMonthFull = getMonthFull;

/**
 * TODO
 * Get month format short
 * 
 * @param {number} month
 * @param {'vi' | 'en'} region
 */
const getMonthShort = (month, region = 'en') => {
    return data_month['short'][month][region];
}
exports.getMonthShort = getMonthShort;

/**
 * TODO
 * Get week day format full
 * 
 * @param {number} month
 * @param {'vi' | 'en'} region
 */
const getWeekdayFull = (month, region = 'en') => {
    return data_weekday['full'][month][region];
}
exports.getWeekdayFull = getWeekdayFull;

/**
 * TODO
 * Get week day format short
 * 
 * @param {number} month
 * @param {'vi' | 'en'} region
 */
const getWeekdayShort = (month, region = 'en') => {
    return data_weekday['short'][month][region];
}
exports.getWeekdayShort = getWeekdayShort;

/***
 * TODO
 * Identify date object
 * 
 * @param {string | object} date
 * @return {Object}
 */
const identifyDate = (date) => {
    return new Date(date);
};
exports.identifyDate = identifyDate;

/***
 * TODO
 * Get date in now
 * 
 * @return {Object}
 */
exports.now = () => {
    return new Date();
};

/***
 * TODO
 * Cover time 
 * If value is smaller 10, it will add '0' before value
 * 
 * @param {string} time 
 * @return {Object}
 */
function coverTime(time) {
    return time < 10 ? "0" + time : time;
}

/***
 * TODO
 * Format date following VI or EN
 * 
 * @param {date} date
 * @param {
 * 'YYYY-MM-DD' | 
 * 'DD-MM-YYYY' | 
 * 'MM-DD-YYYY' | 
 * 'DD ThMM,YYYY' | 
 * 'DD ThangMM,YYYY' | 
 * 'DD MMMM,YYYY' | 
 * 'DD MMM,YYYY' | 
 * 'WW MMM DD,YYYY' | 
 * 'WWWW MMMM DD,YYYY' | 
 * 'TT DD ThMM,YYYY' | 
 * 'Thu, DD ThangMM,YYYY' | 
 * 'hh:mm:ss' | 
 * 'hh:mm' | 
 * 'DD ThMM,YYYY hh:mm' | 
 * 'DD ThMM,YYYY hh:mm:ss' | 
 * 'DD MMM,YYYY hh:mm' | 
 * 'DD MMM,YYYY hh:mm:ss' | 
 * 'DD MMMM,YYYY hh:mm' | 
 * 'DD MMMM,YYYY hh:mm:ss' | 
 * 'WW MMM DD,YYYY' hh:mm' | 
 * 'WW MMM DD,YYYY' hh:mm:ss' | 
 * 'WWWW MMMM DD,YYYY' hh:mm' | 
 * 'WWWW MMMM DD,YYYY' hh:mm:ss' | 
 * 'DD MMMM,YYYY hh:mm' | 
 * 'DD MMMM,YYYY hh:mm:ss' | 
 * 'TT DD ThMM,YYYY hh:mm' | 
 * 'TT DD ThMM,YYYY hh:mm:ss' | 
 * 'Thu, DD ThangMM,YYYY hh:mm' | 
 * 'Thu, DD ThangMM,YYYY hh:mm:ss' | 
 * } format - YYYY, MM, DD must uppercase
 * @return {string} string of date
 */
const format = (date, format = 'YYYY-MM-DD') => {
    date = identifyDate(date);
    let strDate = format;
    strDate = strDate.replace(/WWWW/g, getWeekdayFull(date.getDay()));
    strDate = strDate.replace(/WW/g, getWeekdayShort(date.getDay()));
    strDate = strDate.replace(/Thu/g, getWeekdayFull(date.getDay(), 'vi'));
    strDate = strDate.replace(/TT/g, getWeekdayShort(date.getDay(), 'vi'));
    strDate = strDate.replace(/YYYY/g, date.getFullYear());
    strDate = strDate.replace(/YYYY/g, date.getFullYear());
    strDate = strDate.replace(/ThMM/g, 'Th' + (date.getMonth() + 1));
    strDate = strDate.replace(/ThangMM/g, getMonthFull(date.getMonth(), 'vi'));
    strDate = strDate.replace(/MMMM/g, getMonthFull(date.getMonth()));
    strDate = strDate.replace(/MMM/g, getMonthShort(date.getMonth()));
    strDate = strDate.replace(/MM/g, coverTime(date.getMonth() + 1));
    strDate = strDate.replace(/DD/g, coverTime(date.getDate()));
    strDate = strDate.replace(/hh/g, coverTime(date.getHours()));
    strDate = strDate.replace(/mm/g, coverTime(date.getMinutes()));
    strDate = strDate.replace(/ss/g, coverTime(date.getSeconds()));

    return strDate;
};
exports.format = format;

/***
 * TODO
 * Get date in month
 *
 * @param {date} date which get
 * @return {number}
 */
const numberOfDays = (date) => {
    date = identifyDate(date);
    let month = date.getMonth(),
        year = date.getFullYear();
    if (month === 1) {
        if (year % 4 === 0 || year % 400 === 0) return 29; else return 28;
    }
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) return 31; else return 30;
};
exports.numberOfDays = numberOfDays;

/***
 * TODO
 * Get first week day in month
 *
 * @param {date} date which get
 * @return {number} weekday
 */
exports.firstWeekdayInMonth = (date) => {
    let dt = identifyDate(date);
    dt.setDate(1);
    return dt.getDay();
};

/***
 * TODO
 * Get date in next month
 *
 * @param {date} date which get
 * @return {Date}
 */
exports.nextMonth = (date) => {
    let dt = identifyDate(date);
    dt.setMonth(dt.getMonth() + 1);
    return dt;
};

/***
 * TODO
 * Get date in previous month
 *
 * @param {date} date which get
 * @return {Date}
 */
exports.previousMonth = (date) => {
    let dt = identifyDate(date);
    dt.setMonth(dt.getMonth() - 1);
    return dt;
};


/***
 * TODO
 * Calc weak in year
 * 
 * @param {date} date
 * @return {number}
 */
exports.getWeek = (date) => {
    let dt = identifyDate(date);
    let month = dt.getMonth();
    let sum = dt.getDate();
    for (let i = 0; i < month; i++) {
        sum += numberOfDays(month);
    }
    return Math.floor(sum / 7) + 1;
};

/***
 * TODO
 * Check now
 * 
 * @param {date} date
 * @return {boolean}
 */
exports.checkNow = (date) => {
    let dt = identifyDate(date);
    let now = new Date();
    return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth() && dt.getDate() === now.getDate()
}