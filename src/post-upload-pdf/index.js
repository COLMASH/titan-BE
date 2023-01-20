const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

const {internalServerError, badRequest} = require('../libraries/responses')
const {parser} = require('../libraries/multipart-form-parser')
const {callEtherFaxService} = require('../libraries/fax-service')
const {v4: uuidv4} = require('uuid')
const _ = require('lodash')
const s3 = new AWS.S3()

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

        let s3Files = []
        for (let file of files) {
            const {contentType, content} = file

            const extension = contentType.substring(contentType.indexOf('/')).replace('/', '.')

            const fileUploaded = await s3
                .upload({
                    Bucket: 'titan-intake-upload-pdf-challenge',
                    Key: `pdf/${uuidv4()}${extension}`,
                    Body: content,
                    ContentType: contentType
                })
                .promise()

            s3Files.push(fileUploaded)
        }

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
