var db = require('./databaseConfig.js');
var Favourites = require('./favourites.js')
var FavouritesDB = {
    addFavourite: function (memberId, itemId) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                var sql = `CREATE TABLE IF NOT EXISTS favouritesentity (MEMBER_ID int NOT NULL,ITEM_ID int NOT NULL);
                           INSERT INTO favouritesentity (MEMBER_ID,ITEM_ID) VALUES (?,?)`;
                var sqlParams = [memberId, itemId];

                conn.query(sql, sqlParams, function (err, result) {
                    conn.end(); // End the connection after query execution
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        if (result.affectedRows > 0) {
                            return resolve(true);
                        } else {
                            return resolve(false); // No rows affected, possibly duplicate entry
                        }
                    }
                });
            });
        });
    },

    removeFavourite: function (memberId, itemId) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                
                var sql = `DELETE FROM favouritesentity WHERE MEMBER_ID = ? AND ITEM_ID = ?`;
                var sqlParams = [memberId, itemId];

                conn.query(sql, sqlParams, function (err, result) {
                    conn.end(); // End the connection after query execution
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        if (result.affectedRows > 0) {
                            return resolve(true); // Item removed successfully
                        } else {
                            return resolve(false); // No matching rows found, item might not be in favorites
                        }
                    }
                });
            });
        });
    }
};

module.exports = FavouritesDB;