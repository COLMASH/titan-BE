const busboy = require('busboy')

const parser = (event) =>
    new Promise((resolve) => {
        var contentType = event.headers['Content-Type'] || event.headers['content-type']
        console.log('contentType', contentType)
        var bb = busboy({headers: {'content-type': contentType}})

        const result = {
            files: []
        }

        bb.on('file', function (fieldname, file, file_data) {
            const {mimeType, encoding, filename} = file_data
            console.log('mimeType', mimeType)
            console.log('filename', filename)

            const uploadFile = {}

            file.on('data', function (data) {
                uploadFile.content = data
            }).on('end', function () {
                if (uploadFile.content) {
                    uploadFile.filename = filename
                    uploadFile.contentType = mimeType
                    uploadFile.encoding = encoding
                    uploadFile.fieldname = fieldname
                    result.files.push(uploadFile)
                }
            })
        })
            .on('field', function (fieldname, value) {
                result[fieldname] = value
            })
            .on('finish', function () {
                resolve(result)
            })

        const encoding = event.encoding || (event.isBase64Encoded ? 'base64' : 'binary')

        bb.write(event.body, encoding)
        bb.end(event.body)
    })

module.exports = {parser}
