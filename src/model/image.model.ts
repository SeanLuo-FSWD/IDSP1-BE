import s3 from "../util/s3storage.util";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";

class ImageModel {
  private _bucket: string = "idsp2";
  private _key;
  private _body;

  constructor(name, body) {
    this._key = "images/" + `${Date.now()}` + "_" + path.basename(name);
    this._body = body;
  }

  public async upload() {
    console.log("1111111111111111111111 inside upload");

    const uploadParams = {
      Bucket: this._bucket,
      Key: this._key,
      Body: this._body,
    };
    await s3.send(new PutObjectCommand(uploadParams));
    const s3domain = "https://idsp2.s3-us-west-1.amazonaws.com";
    console.log(
      "image uploaded successfully on : ",
      `${s3domain}/${encodeURIComponent(this._key)}`
    );
    const imageUrl = `${s3domain}/${encodeURIComponent(this._key)}`;
    return imageUrl;
  }
}

export default ImageModel;
