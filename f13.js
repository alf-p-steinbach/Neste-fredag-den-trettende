function $(x)               { return document.getElementById(x); }
function yearOf(date)       { return 1900 + date.getYear(); }
function monthOf(date)      { return 1 + date.getMonth(); }
function dayOf(date)        { return date.getDate(); }
function weekdayOf(date)    { return date.getDay(); }               // 0 = Sunday.
function cloneOfDate(date)  { return new Date(date.getTime()); }
function setDayOf(date, d)  { date.setDate(d); }
function asNDigits(x, n)    { return x.toString().padStart(n, '0'); }

function isoStringForLocalDate(date) {
    return asNDigits(yearOf(date), 4)
        + '-' + asNDigits(monthOf(date), 2)
        + '-' + asNDigits(dayOf(date), 2);
}

var norwegian =
{
    monthName: function (n) {
        const names = ['januar', 'februar', 'mars', 'april', 'mai', 'juni',
            'juli', 'august', 'september', 'oktober', 'november', 'desember'];
        return names[n];
    },

    dateString: function (date) {
        return dayOf(date) + '. ' + this.monthName(monthOf(date) - 1);
    }
};

function displayResultFor(startDate) {
    const fridayNumber = 5;

    let date = cloneOfDate(startDate);
    let nDays = 0;
    do {
        setDayOf(date, dayOf(date) + 1);
        ++nDays;
    } while (weekdayOf(date) != fridayNumber || dayOf(date) != 13);

    $('n-days').innerText = nDays.toString();
    $('start-date').innerText = norwegian.dateString(startDate);
    $('year').innerText = yearOf(startDate).toString();
    $('friday-13-date').innerText = 'fredag den ' + norwegian.dateString(date);
    $('result').style.display = 'block';
}

function onDateChoice() {
    const startDateSpec = $('date-choice').value;
    if (startDateSpec == '')        // The date choice was cleared by user.
    {
        $('result').style.display = 'none';
        return;
    }
    const startDate = new Date(startDateSpec);
    if (startDate == undefined) {
        return;                     // TODO: report error, if any.
    }
    displayResultFor(startDate);
}

function onDocumentLoaded() {
    let date = new Date();
    $('date-choice').value = isoStringForLocalDate(date);
    displayResultFor(date);
}
