import { Params } from './';

export function resolve(link: string, params: Params = {}): string {
  let { url, options } = getLinkOptions(link);
  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      url = url.replace(new RegExp(`\{${key}\}`), value.toString());
    } else if (url.includes(`{${key}`)) {
      throw new Error('Path params can not be null!');
    }
  });
  const missingParam = url.match(/\S+\{(\w+)\}/);
  if (missingParam) {
    throw new Error(`Path param ${missingParam[1]} is missing`);
  }
  url = addQueryParams(url, options, params);
  return url;
}

function addQueryParams(link: string, options: Array<string>, params: Params) {
  const url = new URL(link);
  options.forEach((name) => {
    const value = params[name];
    if (value != null) {
      url.searchParams.set(name, value.toString());
    }
  });
  return url.toString();
}

function getLinkOptions(
  link: string,
  startToken: Array<string> = ['{?', '{&'],
) {
  let optionsStart: number = -1;
  startToken.forEach((token) => {
    optionsStart = Math.max(optionsStart, link.indexOf(token));
  });
  if (optionsStart !== -1) {
    const strippedLink = link.substr(0, optionsStart);
    const optionsStr = link
      .substr(optionsStart + startToken.length)
      .split('}')[0];
    return {
      url: strippedLink,
      options: optionsStr.split(','),
    };
  } else {
    return { url: link, options: [] };
  }
}
