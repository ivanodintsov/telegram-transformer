import { FormatterFn, FormattersDict } from './types';

export const defaultFormatter: FormatterFn = (entityText, entity, text) => {
  const before = '';
  const after = '';

  return {
    before,
    after,
    text: `${before}${entityText}${after}`,
  };
};

export const formatters: FormattersDict = {
  mention: defaultFormatter,
  hashtag: defaultFormatter,
  cashtag: defaultFormatter,
  bot_command: defaultFormatter,
  url: defaultFormatter,
  email: defaultFormatter,
  phone_number: defaultFormatter,
  bold: defaultFormatter,
  italic: defaultFormatter,
  underline: defaultFormatter,
  strikethrough: defaultFormatter,
  spoiler: defaultFormatter,
  code: defaultFormatter,
  pre: defaultFormatter,
  text_link: defaultFormatter,
};
