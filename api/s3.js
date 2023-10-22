const AWS = require('aws-sdk');
require('dotenv').config()
const fs = require('fs')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadFile = (fileName, keyName) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: 'airbnb-clone-v3', // Use the name of your existing bucket
    Key: keyName, // The name you want to give the file in S3
    Body: fileContent,
    ContentType: 'image/jpeg'// Replace with the appropriate content type
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
      return null
    } else {
      console.log('File uploaded to S3:', data.Location);
    }
      // data.Location contains the URL of the uploaded image
      const imageUrl = data.Location;

      return imageUrl;
  });
};

// Usage: Provide the local file path and the desired key (file name) in S3
module.exports = uploadFile