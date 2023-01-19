const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

const {internalServerError, badRequest} = require('../libraries/responses')
const {parser} = require('../libraries/multipart-form-parser')
const {v4: uuidv4} = require('uuid')
const _ = require('lodash')
const s3 = new AWS.S3()

async function handler(event) {
    try {
        const result = await parser(event)
        const files = result.files
        const stage = process.env.STAGE

        if (_.isEmpty(files) || _.isNil(files)) {
            return badRequest
        }

        let folder = 'test'
        if (stage === 'production') {
            folder = 'production'
        }

        let s3Files = []
        for (let file of files) {
            const {contentType, content} = file

            const extension = contentType.substring(contentType.indexOf('/')).replace('/', '.')

            const fileUploaded = await s3
                .upload({
                    Bucket: 'savesolar-bills-uploaded',
                    Key: `${folder}/${uuidv4()}${extension}`,
                    Body: content,
                    ContentType: contentType
                })
                .promise()

            s3Files.push(fileUploaded)
        }

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
