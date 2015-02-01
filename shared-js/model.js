/*global module:false, angular: false*/

(function(module, angular) {
    function factory() {
        function getUnit(unit) {
            if (typeof unit === 'string') unit = parseInt(unit);
            switch (unit) {
                case 1:
                    return 'am';
                case 2:
                    return 'pm';
                case 3:
                    return 'all';
                default: throw 'Unrecognised unit: ' + unit;
            }
        }

        function DateSummary(date, absences) {
            this.date = date;
            this.absences = absences || [];
        }

        DateSummary.fromRows = function (rows) {
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

        DateSummary.fromJs = function (data) {
            return new DateSummary(data.date,
                data.absences.map(function (a) {
                    return new Absence(a);
                }));
        };

        function Absence(data) {
            var self = this;
            Object.keys(data).forEach(function (key) {
                self[key] = data[key];
            });
        }


        Absence.prototype.getDays = function() {
            switch (this.unit) {
                case 'am':
                case 'pm':
                    return 0.5;
                case 'all':
                    return 1.0;
                default:
                    throw 'Unsupported unit';
            }
        };


        Absence.fromRow = function (row) {
            return new Absence({
                user: {
                    id: row.userid,
                    firstName: row.firstname,
                    lastName: row.lastname,
                    workStream: row.workstream,
                    workStreamColor: row.workstreamcolor,
                    imageUrl: row.imageurl
                },
                unit: getUnit(row.unit),
                type: row.type,
                date: row.absencedate
            });
        };

        return {
            Absence: Absence,
            DateSummary: DateSummary
        };
    }

    if (module) {
        module.exports= factory();
    } else if (angular) {
        var model = factory();
        angular.module('whoswhere.Model', [])
            .factory('Model', function() { return model; });
    }
}((typeof module === 'undefined' ? null : module), this.angular));