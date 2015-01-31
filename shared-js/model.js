/*global require:false, module:false*/

(function(module, require) {
    function getUnit(unit) {
        switch(unit) {
            case 1: return 'am';
            case 2: return 'pm';
            default: return 'all';
        }
    }

    function DateSummary(date, absences) {
        this.date = date;
        this.absences = absences || [];
    }

    DateSummary.fromRows = function(rows){
        var dates = {};
        rows.forEach(function (row) {
            if (!dates[row.absencedate]) {
                dates[row.absencedate] = [];
            }

            dates[row.absencedate].push(row);
        });

        return Object.keys(dates).map(function (date) {
            return new DateSummary(date, dates[date].map(Absence.fromRow));
        });
    };

    function Absence(data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self[key] = data[key];
        });
    }

    Absence.fromRow = function (row) {
        return new Absence({
            user: {
                id: row.userid,
                firstName: row.firstname,
                lastName: row.lastname,
                workStream: row.workstream
            },
            unit: getUnit(row.unit),
            type: row.type,
            date: row.absencedate
        });
    };

    module.exports = {
        Absence: Absence,
        DateSummary: DateSummary
    };
}(module, require));