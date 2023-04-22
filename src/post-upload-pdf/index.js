const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

const {internalServerError, badRequest} = require('../utils/responses')
const {parser} = require('../utils/parser')
const {callEtherFaxService} = require('../utils/callEtherFaxService')
const {s3FileUpload} = require('../utils/s3FileUpload')
const _ = require('lodash')

async function handler(event) {
    try {
        const result = await parser(event)
        const {files, phoneNumber} = result

        if (_.isEmpty(files) || _.isNil(files)) {
            return badRequest
        }

        if (typeof phoneNumber !== 'string' || phoneNumber.length < 12) {
            return badRequest
        }

        await s3FileUpload(files)
        await callEtherFaxService(phoneNumber, files[0].content)

        return {
            statusCode: 200,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({
                message: 'Pdf was uploaded successfully'
            })
        }
    } catch (error) {
        console.error(error)
        return internalServerError
    }
}

module.exports = {
    handler
}
