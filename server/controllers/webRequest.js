var rp = require('request-promise');
const { roles } = require('../roles')

exports.import = async (req, res, next) => {
    try {
            var options = {
                uri: 'http://www.mocky.io/v2/5808862710000087232b75ac',
                method : 'GET',
                useQuerystring: true,
                qs: {
                    "must": [
                        { "match": { "data.clients.id": req.params.userId }},
                    ]
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true // Automatically parses the JSON string in the response
            };
        rp(options)
            .then(function (response) {

                for (const [key, value] of Object.entries(response.clients)) {
                    if (req.params.userId === response.clients[key].id) {
                        res.status(200).json({
                            data:response.clients[key]
                        })
                    }
                }
            })
            .catch(function (err) {
                // API call failed...
                console.log(err);
            });
    } catch (error) {
        next(error)
    }
}

exports.filterByUsername = async (req, res, next) => {
    try {
        var options = {
            uri: 'http://www.mocky.io/v2/5808862710000087232b75ac',
            method : 'GET',
            useQuerystring: true,
            qs: {
                "must": [
                    { "match": { "data.clients.name": req.params.userName }},
                ]
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
    rp(options)
        .then(function (response) {

            for (const [key, value] of Object.entries(response.clients)) {
                if (req.params.userName === response.clients[key].name) {
                    res.status(200).json({
                        data:response.clients[key]
                    })
                }
            }
        })
        .catch(function (err) {
            // API call failed...
            console.log(err);
        });
    } catch (error) {
        next(error)
    }
}

exports.filterPolicybyUser = async (req, res, next) => {

    try {
        var options = {
            uri: 'http://www.mocky.io/v2/580891a4100000e8242b75c5',
            method : 'GET',
            useQuerystring: true,
            qs: {
                "must": [
                    { "match": { "data.policies.id": req.params.filterPolicybyUser }},
                ]
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        rp(options)
            .then(function (response) {

                for (const [key, value] of Object.entries(response.policies)) {
                    if (req.params.userName === response.policies[key].id) {
                        res.status(200).json({
                            data:response.policies[key]
                        })
                    }
                }
            })
            .catch(function (err) {
                // API call failed...
                console.log(err);
            });
    } catch (error) {
        next(error)
    }


}

exports.listPoliciesbyUser = async (req, res, next) => {

    try {
        var options = {
            uri: 'http://www.mocky.io/v2/580891a4100000e8242b75c5',
            method : 'GET',
            useQuerystring: true,
            qs: {
                "must": [
                    { "match": { "data.policies": req.params.listPoliciesbyUser }},
                ]
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        rp(options)
            .then(function (response) {
                for (const [key, value] of Object.entries(response.policies)) {
                    if (req.params.userName === response.policies[key].email) {
                        res.status(200).json({
                            data:response.policies
                        })
                    return;
                    }
                }
            })
            .catch(function (err) {
                // API call failed...
                console.log(err);
            });
    } catch (error) {
        next(error)
    }

}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
            return res.status(401).json({
            error: "You don't have enough permission to perform this action"
            });
        }
        next()
        } catch (error) {
        next(error)
        }
    }
}

exports.allowIfLoggedin = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
        return res.status(401).json({
            error: "You need to be logged in to access this route"
        });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
