"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// This file is auto-generated, don't edit it
const ocr_api20210707_1 = __importStar(require("@alicloud/ocr-api20210707")), $ocr_api20210707 = ocr_api20210707_1;
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const $OpenApi = __importStar(require("@alicloud/openapi-client"));
const tea_util_1 = __importStar(require("@alicloud/tea-util")), $Util = tea_util_1;
class Client {
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient() {
        let config = new $OpenApi.Config({
            accessKeyId: "LTAI5tATrTo3buQDmGA3SgBh",
            accessKeySecret: "BQhBa1D1Q5hFKYCiyb6RCVFv4LOMxD",
        });
        // 访问的域名
        config.endpoint = `ocr-api.cn-hangzhou.aliyuncs.com`;
        return new ocr_api20210707_1.default(config);
    }
    static eduPaperCut(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = Client.createClient();
            let recognizeEduPaperCutRequest = new $ocr_api20210707.RecognizeEduPaperCutRequest({
                cutType: "question",
                imageType: "photo",
                url: url,
            });
            let runtime = new $Util.RuntimeOptions({});
            try {
                return yield client.recognizeEduPaperCutWithOptions(recognizeEduPaperCutRequest, runtime);
            }
            catch (error) {
                return tea_util_1.default.assertAsString(error.message);
            }
        });
    }
    static advanced(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = Client.createClient();
            let recognizeAdvancedRequest = new $ocr_api20210707.RecognizeAdvancedRequest({
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
                return yield client.recognizeAdvancedWithOptions(recognizeAdvancedRequest, runtime);
            }
            catch (error) {
                return tea_util_1.default.assertAsString(error.message);
            }
        });
    }
    static eduPaperStructed(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = Client.createClient();
            let recognizeEduPaperStructedRequest = new $ocr_api20210707.RecognizeEduPaperStructedRequest({
                url: url,
            });
            let runtime = new $Util.RuntimeOptions({});
            try {
                // 复制代码运行请自行打印 API 的返回值
                return yield client.recognizeEduPaperStructedWithOptions(recognizeEduPaperStructedRequest, runtime);
            }
            catch (error) {
                // 如有需要，请打印 error
                return tea_util_1.default.assertAsString(error.message);
            }
        });
    }
}
exports.default = Client;
Client.eduPaperCut(process.argv.slice(2));
Client.advanced(process.argv.slice(2));
Client.eduPaperStructed(process.argv.slice(2));
