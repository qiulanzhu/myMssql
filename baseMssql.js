var base = process.cwd();
var logger = require(base + '/logService');
var config = require(base + "/config.json");
var sql = require("mssql");
var Q = require("q");
var connection = new sql.Connection(config.mssql);

function _Base() {
}

_Base.prototype._connect = function (callback) {
    var defer = Q.defer();
    var connection = new sql.Connection(config.mssql);
    defer.resolve(connection);
    return defer.promise.nodeify(callback);
};

_Base.prototype._query = function (sqlstr) {
    if (!sqlstr) {
        var err = new Error("sql is empty!");
        var defer = Q.defer();
        return defer.reject(err);
    }

    //是否打印SQL语句
    if (config.debug) {
        logger.sql(sqlstr);
    }

    return connection.connect().then(function () {
        var request = new sql.Request(connection);
        return request.query(sqlstr).then(function (recordset) {
            return recordset;
        }).catch(function (err) {
            return err;
        });
    });
};

module.exports = _Base;