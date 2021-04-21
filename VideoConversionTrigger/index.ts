import { AzureFunction, Context } from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import * as FormData from 'form-data';
import fetch from 'node-fetch';
import axios from 'axios';

const blobTrigger: AzureFunction = async function(
  context: Context,
  myBlob: any,
): Promise<void> {
  // context.log(
  //   'Blob trigger function processed blob \n Name:',
  //   context.bindingData.name,
  //   '\n Blob Size:',
  //   myBlob.length,
  //   'Bytes',
  // );
  var formData = new FormData();
  formData.append('file', myBlob, context.bindingData.name + '.mp4');

  var apiURL = 'https://aicquire-api.azurewebsites.net/api';

  const username = context.bindingData.name.split('-')[0];
  const questionNumber = context.bindingData.name.split('-')[1];
  context.log('username: ', username);

  var videoURL;
  await fetch(apiURL + '/azure/upload/video', {
    method: 'POST',
    body: formData,
  })
    .then(success => {
      console.log('recording upload complete.');
      return success.text();
    })
    .then(data => {
      console.log('data: ', data);
      videoURL = data;
    })
    .catch(error => {
      console.error('an upload error occurred!');
    });

  var files = {
    questionNumber: Number(questionNumber),
    videoURL: videoURL,
  };

  await axios
    .put(apiURL + '/jobseeker/add-one-video-response/' + username, files)
    .then(res => {
      if (res.status == 200) {
        console.log(res.data);
      }
    });

  const connectionString =
    'DefaultEndpointsProtocol=https;AccountName=aicquire;AccountKey=nphm2diqytCqnbLNb3HgiZVqnL4dltaw19eAWX4rn766fbo0W03pBh4qMue+pyYICish/zZbjT/74LCwmca2yw==;EndpointSuffix=core.windows.net';
  const container = 'video-temp';
  const blob = context.bindingData.name;

  const blobClient = BlobServiceClient.fromConnectionString(connectionString)
    .getContainerClient(container)
    .getBlobClient(blob);
  blobClient.deleteIfExists().then(result => {
    context.log(result._response.status + ' blob removed');
  });
};

export default blobTrigger;
