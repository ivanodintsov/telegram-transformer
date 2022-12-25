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
  let offsetChange = 0;
  let afterOffsetChange = 0;
  let prevOffsetChange = 0;
  let prevLengthChange = 0;

  for (let i = 0; i < newEntities.length; i++) {
    const entity = { ...newEntities[i] } as MessageEntity;
    const formatter = formatters[entity.type] || defaultFormatter;
    const isNotInRange = entity.offset < startFrom;

    newEntities[i] = entity;
    entity.offset -= startFrom;

    if (isNotInRange) {
      continue;
    }

    let newOffset = entity.offset + offsetChange;
    let newOffsetWithLength = newOffset + entity.length;
    const prevEntity = newEntities[i - 1];

    if (
      prevEntity &&
      newOffset >= prevEntity?.offset + offsetChange + prevEntity?.length
    ) {
      prevEntity.offset += prevOffsetChange;
      prevEntity.length += prevLengthChange;

      offsetChange += afterOffsetChange;
      afterOffsetChange = 0;
      newOffset = entity.offset + offsetChange;
      newOffsetWithLength = newOffset + entity.length;
    }

    const beforeEntity = newText.substring(0, newOffset);
    const entityText = newText.substring(newOffset, newOffsetWithLength);
    const afterEntity = newText.substring(newOffsetWithLength, newText.length);
    const formatted = formatter(entityText, entity, text);

    prevOffsetChange = offsetChange;
    prevLengthChange = formatted.before.length + formatted.after.length;
    offsetChange += formatted.before.length;
    afterOffsetChange += formatted.after.length;
    newText = `${beforeEntity}${formatted.text}${afterEntity}`;

    if (i === entities.length - 1) {
      entity.offset += prevOffsetChange;
      entity.length += prevLengthChange;
    }
  }

  return {
    text: newText,
    entities: newEntities,
  };
};
