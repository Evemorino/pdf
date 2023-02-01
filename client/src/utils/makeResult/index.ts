interface ResulContent {
  title: string;
  options: string;
  optionsNumber: number;
  flag: boolean;
}

interface modifyResult {
  modifyStringArray: string[];
  optionsNumber: number;
}

interface EduPaperStructOptions {
  title: string;
  optionsArray: string[];
}

interface titleOptions {
  options: string;
  optionsNumber: number;
}

function judgeOptions(string: string): boolean {
  const target: string[] = ["A", "B", "C", "D", "E", "F"];
  const dots: string[] = [".", "·", ".", "•"];
  const flag =
    target.includes(string.charAt(0)) && dots.includes(string.charAt(1))
      ? true
      : false;
  if (flag) {
    string = string.substring(2);
  }
  return flag;
}

function modifyEduPaperCutOptions(stringArray: string[]): modifyResult {
  let optionsNumber = 0;
  const tempStringArray: string[] = [];
  let tempString = "";
  for (let i = 0; i < stringArray.length; i++) {
    if (judgeOptions(stringArray[i])) {
      optionsNumber++;
      tempStringArray.push(tempString);
      tempString = stringArray[i].substring(2);
    } else {
      tempString += stringArray[i];
    }
  }
  tempStringArray.push(tempString);
  return {
    modifyStringArray: tempStringArray,
    optionsNumber: optionsNumber,
  };
}

function createEduPaperCutStringArray(list: any[]): string[] {
  const string: string[] = [];
  for (let i = 0; i < list.length; i++) {
    string[i] = list[i].word;
  }
  return string;
}

function createEduPaperStructOptions(data: any[]): EduPaperStructOptions {
  let title = "";
  const options: string[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].type == 0) {
      title += data[i].text;
    }
    if (data[i].type == 1) {
      options.push(data[i].text);
    }
  }
  return {
    title: title,
    optionsArray: options,
  };
}

function modifyEduPaperStructOptions(stringArray: string[]): titleOptions {
  let optionsNumber = 0;
  let tempString = "";
  for (let i = 0; i < stringArray.length; i++) {
    tempString += stringArray[i].replace(
      /[ABCDEFG][.·.•]/g,
      function (value): string {
        optionsNumber++;
        return "\n";
      }
    );
    if (i == 0) {
      tempString = tempString.substring(1);
    }
  }
  return {
    options: tempString,
    optionsNumber: optionsNumber,
  };
}

export function createEduPaperCutContent(data: any[]): ResulContent {
  const stringArray = createEduPaperCutStringArray(data);
  const { modifyStringArray, optionsNumber } =
    modifyEduPaperCutOptions(stringArray);
  const flag = optionsNumber >= 2 ? true : false;
  const title = modifyStringArray[0];
  let options = "";
  for (let i = 1; i < modifyStringArray.length; i++) {
    options +=
      i < modifyStringArray.length - 1
        ? modifyStringArray[i] + "\n"
        : modifyStringArray[i];
  }
  return {
    title: title,
    options: options,
    optionsNumber: optionsNumber,
    flag: flag,
  };
}

export function createEduPaperStructContent(data: any[]) {
  const { title, optionsArray } = createEduPaperStructOptions(data);
  const { optionsNumber, options } = modifyEduPaperStructOptions(optionsArray);
  const flag = optionsNumber >= 2 ? true : false;
  return {
    title: title,
    options: options,
    optionsNumber: optionsNumber,
    flag: flag,
  };
}
