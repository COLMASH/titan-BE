const internalServerError = {
    statusCode: 500,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({
        message: 'Internal server error'
    })
}

const unauthorized = {
    statusCode: 401,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({
        message: 'Unauthorized'
    })
}

const badRequest = {
    statusCode: 400,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({
        message: 'Bad Request'
    })
}

const notFound = {
    statusCode: 404,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({
        message: 'Not Found'
    })
}

module.exports = {
    internalServerError,
    unauthorized,
    badRequest,
    notFound
}
