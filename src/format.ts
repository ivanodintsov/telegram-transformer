import { MessageEntity } from 'typegram';
import { DEFAULT_OPTIONS } from './constants';
import { defaultFormatter } from './formatters';
import { Options } from './types';

export const format = (
  text: string,
  entities: MessageEntity[] = [],
  options: Options = DEFAULT_OPTIONS,
) => {
  if (!entities?.length) {
    return {
      text,
      entities,
    };
  }

  const newEntities: MessageEntity[] = [...entities];
  const formatters = {
    ...DEFAULT_OPTIONS.formatters,
    ...options.formatters,
  };

  const startFrom = options.startFrom || DEFAULT_OPTIONS.startFrom;
  let newText = text;
  let prevOffsetChange = 0;
  let prevAfterChange = 0;

  for (let i = 0; i < newEntities.length; i++) {
    const entity = { ...newEntities[i] } as MessageEntity;
    const formatter = formatters[entity.type] || defaultFormatter;
    const isNotInRange = entity.offset < startFrom;

    newEntities[i] = entity;
    entity.offset -= startFrom;

    if (isNotInRange) {
      continue;
    }

    let newOffset = entity.offset + prevOffsetChange;
    let newOffsetWithLength = newOffset + entity.length;

    const prevEntity = newEntities[i - 1];

    if (prevEntity && newOffset > prevEntity.offset + prevEntity.length) {
      prevOffsetChange += prevAfterChange;
      prevAfterChange = 0;
    }

    newOffset = entity.offset + prevOffsetChange;
    newOffsetWithLength = newOffset + entity.length;

    const beforeEntity = newText.substring(0, newOffset);
    const entityText = newText.substring(newOffset, newOffsetWithLength);
    const afterEntity = newText.substring(newOffsetWithLength, newText.length);
    const formatted = formatter(entityText, entity, text);

    prevOffsetChange += formatted.before.length;
    prevAfterChange += formatted.after.length;

    entity.offset = newOffset;

    newText = `${beforeEntity}${formatted.text}${afterEntity}`;
  }

  return {
    text: newText,
    entities: newEntities,
  };
};
