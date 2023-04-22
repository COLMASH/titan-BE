const {v4: uuidv4} = require('uuid')
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const s3 = new AWS.S3()

const s3FileUpload = async (files) => {
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
}

module.exports = {s3FileUpload}
