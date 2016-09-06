var base = process.cwd();
var logger = require(base + '/logService');
var BaseMssql = require('./baseMssql');
var _ = require('underscore');

function Mssql() {
}

Mssql.prototype = BaseMssql.prototype;

var mssql = new Mssql();

mssql._query('select * from studentTable')
    .then(function (result) {
        if (_.isArray(result) === false) {
            logger.error(result);
        } else {
            logger.ndump('result', result);
        }
    });

