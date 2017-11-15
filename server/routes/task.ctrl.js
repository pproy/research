'use strict';

const async = require("async");
//const uscore = require('underscore');
//Load model
const taskModel = require('./task.model');


const addTask = function(req, res) {

    let response = {
        'jsonrpc': '2.0'
    };

    let res_post = req.body.params;

    /*req.body.params.password = crypto.createHmac("sha1", env.secret_key).update(req.body.params.password).digest('hex');
    req.body.params.active = (req.body.params.status) ? "true" : "false";
    req.body.params.created_at = objHelper.now();
    req.body.params.updated_at = objHelper.now();
    let res_post = objHelper.reqParamIntersec(req.body.params, ['restaurant_name', 'contact_name', 'email', 'password', 'country_code', 'phone', 'address', 'city', 'state', 'zip_code',
        'active', 'created_at', 'updated_at']);*/

    let addTaskModel = function (callback) {
        taskModel.addTask(res_post, callback);
    };

    async.waterfall([addTaskModel], function (err, result) {

        try {
            if (err) {
                //console.log(err.message);
                response.error.message = err.message;
            } else {
                response.result = result;
            }
        } catch (e) {
            console.log(e);
            response.error = errorCodes['-32000'];
        }
        //console.log(response);
        res.send(response);
    });
}
;


const updateBusinessUser = function(req, res) {

    let response = {
        'jsonrpc': '2.0'
    };


    let user_id = req.body.params.id;

    if (!!req.body.params.password && req.body.params.password !== undefined) {
        req.body.params.password = crypto.createHmac("sha1", env.secret_key).update(req.body.params.password).digest('hex');
    } else {
        delete req.body.params.password;
    }
    req.body.params.active = (req.body.params.status) ? "true" : "false";
    req.body.params.updated_at = objHelper.now();

    let res_post = objHelper.reqParamIntersec(req.body.params, ['restaurant_name', 'contact_name', 'email', 'password', 'country_code', 'phone', 'address', 'city', 'state', 'zip_code',
        'active', 'updated_at']);

    let updateBusinessUserRecord = function (callback) {
        businessUserModel.updateBusinessUser(user_id, res_post, callback);
    };

    async.waterfall([updateBusinessUserRecord], function (err, result) {

        try {
            if (err) {
                //console.log(err.message);
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            console.log(e);
            response.error = errorCodes['-32000'];
        }
        //console.log(response);
        res.send(response);
    });
}
;

const businessUserCount = function(req, res) {

    let response = {
        'jsonrpc': '2.0',
        'method': 'count'
    };
    let searchQ = req.query.q || '';
    let fetchList = function(callback) {
        // calling model for get data
        businessUserModel.businessUserCount(searchQ, callback);
    };

    async.series([fetchList], function(err, result) {
        try {
            //Final Result After Executing Tasks
            if (err !== null) {
                response.error = err;
            } else {
                response.result = {
                    numPerPage: env.pagination.numPerPage,
                    count: result[0]
                };
            }
        } catch (e) {
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
};

const businessUserList = function(req, res) {
    let response = {
        "jsonrpc": '2.0'
    };
    let fetchList = function (callback) {
        let offset = req.query.p || 1;
        offset = (parseInt(offset) - 1) * env.pagination.numPerPage;
        let searchQ = req.query.q || null;
        // let state = req.query.ms || false;
        // let marketOffice = req.query.mo || false;
        // calling model for get data
        businessUserModel.getList(searchQ, offset, env.pagination.numPerPage, callback);
    };

    async.series([fetchList], function (err, result) {
        try {
            //Final Result After Executing Tasks
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
}
;


const businessUserAutoComplete = function(req, res) {    
    let response = {
        "jsonrpc": '2.0'
    };
    let fetchList = function (callback) {
        businessUserModel.businessUserAutoComplete(callback);
    };

    async.series([fetchList], function (err, result) {
        try {
            //Final Result After Executing Tasks
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
}
;


//# getting customer record by id from customer table by model.
const businessUserInfo = function(req, res) {
    let response = {
        'jsonrpc': '2.0'
    };
    let id = req.params.id || null;
    let checkRequest = function (callback) {
        try {
            if (!id || id === null) {
                callback(errorCodes['-32014'], null);
            } else {
                callback();
            }
        } catch (e) {
            //Log(e);
            callback(errorCodes['-32000'], null);
        }
    };

    let getInfo = function (callback) {
        businessUserModel.businessUserInfo(id, callback);
    };

    async.waterfall([checkRequest, getInfo], function (err, result) {
        try {
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
}
;


//# getting customer record by id from customer table by model.
const getBusinessUserRestaurants = function(req, res) { 
    let response = {
        'jsonrpc': '2.0'
    };
    let business_user_id = req.params.id || null;
    let checkRequest = function (callback) {
        try {
            if (!business_user_id || business_user_id === null) {
                callback(errorCodes['-32014'], null);
            } else {
                callback();
            }
        } catch (e) {
            //Log(e);
            callback(errorCodes['-32000'], null);
        }
    };

    let getRestaurants = function (callback) {
        businessUserModel.getBusinessUserRestaurants(business_user_id, callback);
    };

    let getRestaurantsDeviceInfo = function (data, callback) {
        businessUserModel.getRestaurantsDeviceInfo(data, callback);
    };

    async.waterfall([checkRequest, getRestaurants, getRestaurantsDeviceInfo], function (err, result) {
        try {
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
};


const deleteBusinessUser = function(req, res) {
    let response = {
        'jsonrpc': '2.0'
    };
    let id = req.params.id || null;
    let checkRequest = function (callback) {

        try {
            if (!id || id === null) {
                callback(errorCodes['-32014'], null);
            } else {
                callback();
            }
        } catch (e) {
            //Log(e);
            callback(errorCodes['-32000'], null);
        }
    };


    let deleteBURestaurant = function (callback) {
        businessUserModel.deleteBusinessUserRestaurant(id, callback);
    };

    let deleteBU = function (id, callback) {
        businessUserModel.deleteBusinessUser(id, callback);
    };

    async.waterfall([checkRequest, deleteBURestaurant, deleteBU], function (err, result) {
        try {
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
}
;

//Called from restaurant edit page
const deleteBusinessUserRestaurant = function(req, res) {
    
    let response = {
        'jsonrpc': '2.0'
    };
    
    let business_user_id = req.body.params.business_user_id;
    let restaurant_id = req.body.params.restaurant_id;
    
    let checkRequest = function (callback) {

        try {
            if (!business_user_id || business_user_id === null || !restaurant_id || restaurant_id === null) {
                callback(errorCodes['-32014'], null);
            } else {
                callback();
            }
        } catch (e) {
            //Log(e);
            callback(errorCodes['-32000'], null);
        }
    };


    let deleteBURestaurant = function (callback) {
        businessUserModel.deleteABuRestaurantRecord(business_user_id, restaurant_id, callback);
    };

    async.waterfall([checkRequest, deleteBURestaurant], function (err, result) {
        try {
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
}
;


//Called from restaurant edit page
const addBusinessUserRestaurant = function(req, res) {
    
    let response = {
        'jsonrpc': '2.0'
    };
    
    let business_user_id = req.body.params.business_user_id;
    let restaurant_id = req.body.params.restaurant_id;
    
    let checkRequest = function (callback) {

        try {
            if (!business_user_id || business_user_id === null || !restaurant_id || restaurant_id === null) {
                callback(errorCodes['-32014'], null);
            } else {
                callback();
            }
        } catch (e) {
            //Log(e);
            callback(errorCodes['-32000'], null);
        }
    };    
    
    req.body.params.created_at = objHelper.now();
    
    let res_post = objHelper.reqParamIntersec(req.body.params, ['business_user_id', 'restaurant_id', 'created_at']);

    let addBURestaurant = function (callback) {
        businessUserModel.addABuRestaurantRecord(res_post, callback);
    };

    async.waterfall([checkRequest, addBURestaurant], function (err, result) {
        try {
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
};

const sendPushToRestaurant = function(req, res){
    let response = { "jsonrpc": '2.0' },
        notify_content = !!req.body.params && !!req.body.params.notify_content ? req.body.params.notify_content : null;

    let notifyRes = function(callback) {
        businessUserModel.notifyRes(req.body.params, callback);
    };

    async.waterfall([notifyRes], function(err, result) {
        try {
            //Final Result After Executing Tasks
            if (err !== null) {
                response.error = err;
            } else {
                response.result = result;
            }
        } catch (e) {
            //Log(e);
            response.error = errorCodes['-32000'];
        }
        res.send(response);
    });
};

module.exports = {
    addBusinessUser,
    updateBusinessUser,
    businessUserCount,
    businessUserList,
    businessUserInfo,
    getBusinessUserRestaurants,
    deleteBusinessUser,
    businessUserAutoComplete,
    deleteBusinessUserRestaurant,
    addBusinessUserRestaurant,
    sendPushToRestaurant
};