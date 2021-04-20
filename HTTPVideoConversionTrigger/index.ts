import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import fs from "fs";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import * as FormData from 'form-data';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.log("req.rawBody: ", req.rawBody);
    const filename = req.query.filename;
    console.log("filename: ", filename);
    context.log("req: ", req);
    

    // const ffmpeg = createFFmpeg({ log: false });
    // await ffmpeg.load();
    // ffmpeg.FS("writeFile", "test.avi", await fetchFile(data));
    // await ffmpeg.run("-i", "test.avi", "test.mp4");
    // const value = ffmpeg.FS("readFile", "test.mp4");
    // await ffmpeg.FS("unlink", "test.mp4");
    // value.data = URL.createObjectURL(
    // new Blob([value.buffer], { type: "video/mp4" })
    // );
    // value.blob = new Blob([value.buffer], { type: "video/mp4" });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "hello there!!"
    };

};

export default httpTrigger;