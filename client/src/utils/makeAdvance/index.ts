interface AdavaceResult {
  flag: boolean;
  text: string;
}

export function createAdavanceContent(data: any): AdavaceResult {
  const flag = data.prob <= 95 ? true : false;
  const text = data.word;
  return {
    flag: flag,
    text: text,
  };
}
