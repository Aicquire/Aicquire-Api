import { AzureFunction, Context } from '@azure/functions';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import * as FormData from 'form-data';
import fetch from 'node-fetch';
import axios from 'axios';

const blobTrigger: AzureFunction = async function (
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
  // context.log(context.bindingData);
  var formData = new FormData();
  formData.append('file', myBlob, context.bindingData.name + '.mp4');
  // context.log('formData: ', formData);

  var apiURL = 'https://aicquire-api.azurewebsites.net/api';

  const username = context.bindingData.name.split('-')[0];
  const questionNumber = context.bindingData.name.split('-')[1];
  context.log('username: ', username);

  var videoURL;
  await fetch(apiURL + '/azure/upload/video', {
    method: 'POST',
    body: formData,
  })
    .then((success) => {
      console.log('recording upload complete.');
      // this.submitText = 'Video Response Saved';
      // console.log(success);
      return success.text();
    })
    .then((data) => {
      console.log('data: ', data);
      videoURL = data;
    })
    .catch((error) => {
      console.error('an upload error occurred!');
    });

  var files = {
    questionNumber: Number(questionNumber),
    videoURL: videoURL,
  };

  await axios
    .put(apiURL + '/jobseeker/add-one-video-response/' + username, files)
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data);
      }
    });
};

export default blobTrigger;
