// This file is auto-generated, don't edit it
import ocr_api20210707, * as $ocr_api20210707 from "@alicloud/ocr-api20210707";
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import Util, * as $Util from "@alicloud/tea-util";
import * as $tea from "@alicloud/tea-typescript";

export default class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(): ocr_api20210707 {
    let config = new $OpenApi.Config({
      accessKeyId: "LTAI5tATrTo3buQDmGA3SgBh",
      accessKeySecret: "BQhBa1D1Q5hFKYCiyb6RCVFv4LOMxD",
    });
    // 访问的域名
    config.endpoint = `ocr-api.cn-hangzhou.aliyuncs.com`;
    return new ocr_api20210707(config);
  }

  static async eduPaperCut(url: any): Promise<any> {
    let client = Client.createClient();
    let recognizeEduPaperCutRequest =
      new $ocr_api20210707.RecognizeEduPaperCutRequest({
        cutType: "question",
        imageType: "photo",
        url: url,
      });
    let runtime = new $Util.RuntimeOptions({});
    try {
      return await client.recognizeEduPaperCutWithOptions(
        recognizeEduPaperCutRequest,
        runtime
      );
    } catch (error: any) {
      return Util.assertAsString(error.message);
    }
  }

  static async advanced(url: any): Promise<any> {
    let client = Client.createClient();
    let recognizeAdvancedRequest =
      new $ocr_api20210707.RecognizeAdvancedRequest({
        url: url,
        // body: url,
        outputCharInfo: false,
        needRotate: false,
        outputTable: false,
        neetSortPage: false,
        outputFigure: false,
        noStamp: false,
        paragraph: false,
        row: false,
      });
    let runtime = new $Util.RuntimeOptions({});
    try {
      return await client.recognizeAdvancedWithOptions(
        recognizeAdvancedRequest,
        runtime
      );
    } catch (error: any) {
      return Util.assertAsString(error.message);
    }
  }

  static async eduPaperStructed(url: any): Promise<any> {
    let client = Client.createClient();
    let recognizeEduPaperStructedRequest =
      new $ocr_api20210707.RecognizeEduPaperStructedRequest({
        url: url,
      });
    let runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      return await client.recognizeEduPaperStructedWithOptions(
        recognizeEduPaperStructedRequest,
        runtime
      );
    } catch (error: any) {
      // 如有需要，请打印 error
      return Util.assertAsString(error.message);
    }
  }
}

Client.eduPaperCut(process.argv.slice(2));
Client.advanced(process.argv.slice(2));
Client.eduPaperStructed(process.argv.slice(2));