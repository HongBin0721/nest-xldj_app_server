import { HttpException, Injectable } from '@nestjs/common';
import * as url from 'url';
import * as Qiniu from 'qiniu';

@Injectable()
export class UploadService {
  async uploadFiles(files) {
    try {
      if (files.length === 0)
        throw new HttpException('没有选择上传的文件', 400);
      const res = await this.uploadQiniu(files);

      return res;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  uploadQiniu(files) {
    const mac = new Qiniu.auth.digest.Mac(
      process.env.QINIU_AK,
      process.env.QINIU_SK,
    );
    const putPolicy = new Qiniu.rs.PutPolicy({
      scope: process.env.QINIU_SCOPE,
    });
    const uploadToken = putPolicy.uploadToken(mac);

    // uoload
    const formUploader = new Qiniu.form_up.FormUploader(
      new Qiniu.conf.Config({
        zone: Qiniu.zone.Zone_z2,
      }),
    );
    return new Promise((resolve, reject) => {
      const filesUrl = [];

      for (const file of files) {
        // 上传到七牛云
        formUploader.put(
          uploadToken,
          `${Date.now()}-${file.originalname}`,
          file.buffer,
          new Qiniu.form_up.PutExtra(),
          function (respErr, respBody, respInfo) {
            if (respErr) {
              console.error(respErr);
              throw new HttpException(respErr.message, 600);
            }

            if (respInfo.statusCode == 200) {
              filesUrl.push(
                new url.URL(respBody.key, process.env.CDN_URL).href,
              );
              if (files.length == filesUrl.length) {
                resolve(filesUrl);
              }
            } else {
              console.error(respInfo.statusCode, respBody);
              reject(respInfo);
              throw new HttpException(respInfo, respInfo.statusCode);
            }
          },
        );
      }
    });
  }
}
