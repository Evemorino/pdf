import ocr_api20210707 from "@alicloud/ocr-api20210707";
export default class Client {
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient(): ocr_api20210707;
    static eduPaperCut(url: any): Promise<any>;
    static advanced(url: any): Promise<any>;
    static eduPaperStructed(url: any): Promise<any>;
}
