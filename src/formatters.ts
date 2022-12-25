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

export const htmlFormatters: FormattersDict = {
  ...formatters,
  mention: (entityText, entity, text) => {
    const before = `<a href='https://t.me/${entityText.substring(1)}'>`;
    const after = '</a>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  hashtag: (entityText, entity, text) => {
    const before = `<a href='${entityText}'>`;
    const after = '</a>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  url: (entityText, entity, text) => {
    const url = entityText.startsWith('http')
      ? entityText
      : `http://${entityText}`;

    const before = `<a href='${url}'>`;
    const after = '</a>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  email: (entityText, entity, text) => {
    const before = `<a href='mailto:${entityText}'>`;
    const after = '</a>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  phone_number: (entityText, entity, text) => {
    const before = `<a href='tel:${entityText}'>`;
    const after = '</a>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  spoiler: (entityText, entity, text) => {
    const before = `<span class='spoiler-hover'>`;
    const after = '</span>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  text_link: (entityText, entity, text) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const before = `<a href='${entity.url}'>`;
    const after = '</a>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  bold: (entityText, entity, text) => {
    const before = `<strong>`;
    const after = '</strong>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  italic: (entityText, entity, text) => {
    const before = `<i>`;
    const after = '</i>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  underline: (entityText, entity, text) => {
    const before = `<u>`;
    const after = '</u>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
  strikethrough: (entityText, entity, text) => {
    const before = `<strike>`;
    const after = '</strike>';

    return {
      before,
      after,
      text: `${before}${entityText}${after}`,
    };
  },
};
