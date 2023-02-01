import * as XLSX from "xlsx";

// 将字符串转ArrayBuffer
function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
/**
 * 下载Excel文件
 * @param {Array} sheetData 表格数据
 * @param {String} fileName 文件名
 */
function exportFile(sheetData: any[], fileName: string) {
  // 将由对象组成的数组转化成sheet
  const sheet = XLSX.utils.json_to_sheet(sheetData);
  // 创建虚拟的workbook
  const wb = XLSX.utils.book_new();
  // 把sheet添加到workbook中
  XLSX.utils.book_append_sheet(wb, sheet, fileName);
  const workbookBlob = workbook2blob(wb);
  openDownload(workbookBlob, `${fileName}.xlsx`);
}
/**
 * 下载文件
 * @param {blob} blob blob数据流
 * @param {string} fileName 文件名
 */
function openDownload(blob: string | Blob | MediaSource, fileName: string) {
  if (typeof blob === "object" && blob instanceof Blob) {
    blob = URL.createObjectURL(blob); // 创建blob地址
  }
  const aLink = document.createElement("a") as HTMLAnchorElement;
  aLink.href = blob as string;
  aLink.download = fileName || "";
  let event = new MouseEvent("click");
  aLink.dispatchEvent(event);
}
/**
 * 将wrokbook转换成数据流
 * @param {workbook} workbook workbook对象
 * @returns blob数据流
 */
function workbook2blob(workbook: XLSX.WorkBook): Blob {
  // 生成excel的配置项
  const wopts = {
    // 要生成的文件类型
    bookType: "xlsx",
    // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: "binary",
  } as XLSX.WritingOptions;
  const wbout = XLSX.write(workbook, wopts);

  const blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  });
  return blob;
}

export default exportFile;
