# titan-BE

titan-BE is a back-end serverless repository that allows the titan-FE front-end repository (see https://github.com/COLMASH/titan-FE) to send faxes with PDF file content. It's built using the Serverless Framework and deployed on AWS Lambda, API Gateway, and S3.

## Getting started

To use titan-BE, you will need an AWS account and the Serverless Framework installed on your local machine. Follow these steps to get started:

1. Clone the repository to your local machine:

#### `git clone https://github.com/COLMASH/titan-BE.git`

2. Install the required dependencies:

#### `cd titan-BE`

#### `npm install`

3. Configure your AWS credentials:

#### `serverless config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY`

4. Deploy the service to your AWS account:

#### `serverless deploy`

5. Once the deployment is complete, you should see the URL of the API Gateway endpoint in the output of the serverless deploy command. Copy this URL and use it in your titan-FE front-end code to send faxes with PDF file content.

## Architecture

titan-BE is built using a serverless architecture, which means that there are no servers to manage or scale. The following AWS services are used:

1. AWS Lambda: to run the back-end code in response to API Gateway requests
2. API Gateway: to provide a RESTful API for the Titan-FE front-end to communicate with the back-end
3. S3: to store the PDF files temporarily before they are sent to the fax service provider

## Contributing

We welcome contributions to titan-BE! To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and write tests if necessary
4. Submit a pull request

## License

titan-BE is licensed under the MIT License. See LICENSE for more information.

## Contact

If you have any questions or issues, please contact us at mi_santa@hotmail.com.
