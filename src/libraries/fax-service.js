const sdk = require('api')('@etherfax-api/v3.0#1mld74kq6vbiyl')
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
    console.log('secretString', secretString['etherfax-api-key'])
    console.log('typeof secretString', typeof secretString['etherfax-api-key'])
    // sdk.auth(secretString['etherfax-api-key'])
    sdk.auth('wl1ZZ7Ahw0wuAkM/5qy0Dt1oXbUk96JqV59KwBwXH8g=')
    sdk.outbox(
        {
            DialNumber: faxNumber,
            LocalId: '',
            CallerId: '',
            TotalPages: 1,
            TimeZoneOffset: '-5',
            Tag: 'string',
            FaxImage: pdfFile,
            HeaderString: 'string',
            TZ: 'America/Bogota'
        },
        {accept: 'application/json'}
    )
        .then(({data}) => console.log(data))
        .catch((err) => console.error(err))
}

module.exports = {
    callEtherFaxService
}
