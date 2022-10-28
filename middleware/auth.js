const jwt = require("jsonwebtoken");

async function auth(request, response, next) {

    if( !request.header("Authorization")) {
        return response.status(401).send({"message":"Unauthorized"});
    }

    const token = request.header("Authorization").replace("Bearer", "").trim();

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        request.userPayload = payload;
    
        next();
    }
    catch(err) {
        return response.status(400).send({"message":"Invalid auth token"});
    }
}

module.exports = auth;
