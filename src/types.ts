import { MessageEntity } from 'typegram';

export type FormatterFn = (
  entityText: string,
  entity: MessageEntity,
  text: string,
) => { text: string; before: string; after: string };

export type FormattersDict = Record<string, FormatterFn>;

export type Options = { formatters?: FormattersDict; startFrom?: number };
