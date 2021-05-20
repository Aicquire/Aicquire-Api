import { AzureFunction, Context } from '@azure/functions';
import axios from 'axios';

const blobTrigger: AzureFunction = async function (
  context: Context,
  myBlob: any,
): Promise<void> {
  // context.log("Blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
  // console.log("context.bindingData: ", context.bindingData.uri)

  const username: string = context.bindingData.name.split('-')[0];
  const questionNumber: number = context.bindingData.name.split('-')[1];

  let insights: any,
    transcript: string,
    sentiments = {},
    emotions: {};
  let apiURL = 'https://aicquire-api.azurewebsites.net/api';

  context.log('username: ', username);
  context.log('questionNumber: ', questionNumber);
  await axios.get(context.bindingData.uri).then((res) => {
    {
      insights = res.data.videos[0]?.insights;
      console.log('insights received');
      if (insights) {
        console.log('get insights');
        if (insights.sentiments) {
          console.log('get sentiments');
          sentiments = insights.sentiments;
        }
        if (insights.emotions) {
          console.log('get emotions');
          emotions = insights.emotions;
        }
        if (insights.transcript) {
          console.log('get transcript');
          transcript = getTranscript(insights.transcript);
        }

        // console.log('sentiments: ', sentiments);
        // console.log('emotions: ', emotions);
        // console.log('transcript: ', transcript);
      }
    }
  });
  let videoResponses, videoURL;
  console.log('Getting data...');
  await axios.get(apiURL + '/jobseeker/get-data/' + username).then((res) => {
    if (res.status == 200) {
      console.log('Get Data Complete');
      videoResponses = res.data[0].videoResponses;
      console.log('data: ', videoResponses);
    }
    console.log('Getting data complete.');
  });

  for (let index = 0; index < videoResponses.length; index++) {
    if (videoResponses[index].questionNumber == questionNumber) {
      console.log('Video URL found at ' + index);
      console.log(videoResponses[index].videoURL);
      videoURL = videoResponses[index].videoURL;
      break;
    }
  }

  var videoResponse = {
    questionNumber: Number(questionNumber),
    videoURL,
    sentiments,
    emotions,
    transcript,
  };

  console.log('Adding video insight...');
  await axios
    .put(apiURL + '/jobseeker/add-video-insight/' + username, videoResponse)
    .then((res) => {
      if (res.status == 200) {
        console.log('Update Database Complete');
      }
    });
  console.log('Adding video insight Complete.');
};

function getTranscript(transcript: any): any {
  let newTranscript: string;

  newTranscript = '';
  for (let item of transcript) {
    newTranscript += item.text + ' ';
  }

  return newTranscript;
}

export default blobTrigger;
