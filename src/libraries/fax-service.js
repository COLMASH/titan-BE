const axios = require('axios')
const AWS = require('aws-sdk')
const secretsmanager = new AWS.SecretsManager()
AWS.config.update({region: `${process.env.AWS_REGION}`})

const callEtherFaxService = async (faxNumber, pdfFile) => {
    const etherFaxSecretArn = process.env.ETHERFAX_API_KEY
    const secretsmanagerResponse = await secretsmanager
        .getSecretValue({SecretId: etherFaxSecretArn})
        .promise()
    //Get secret
    const etherFaxSecret = await secretsmanagerResponse
    const secretString = JSON.parse(etherFaxSecret.SecretString)
    console.log('secretString', secretString['ETHERFAX_API_KEY'])
    console.log('typeof secretString', typeof secretString['ETHERFAX_API_KEY'])

    const encodedParams = new URLSearchParams()
    encodedParams.set('DialNumber', faxNumber)
    encodedParams.set('TotalPages', '1')
    encodedParams.set('TimeZoneOffset', '-5')
    encodedParams.set('FaxImage', pdfFile)
    encodedParams.set('HeaderString', 'string')
    encodedParams.set('TZ', 'America/Bogota')

    const options = {
        method: 'POST',
        url: 'https://na.connect.etherfax.net/rest/3.0/api/outbox',
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer wl1ZZ7Ahw0wuAkM/5qy0Dt1oXbUk96JqV59KwBwXH8g='
            // authorization: `Basic ${secretString['etherfax-api-key']}`
        },
        data: encodedParams
    }

    await axios
        .request(options)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.error(error)
        })
}

module.exports = {
    callEtherFaxService
}
