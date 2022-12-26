<header>
<div align="center">
<h1 align="center">Telegram message transformer</h1>

<a href="https://www.npmjs.com/package/telegram-transformer">
  <img src="https://img.shields.io/npm/v/telegram-transformer.svg" alt="Latest Release">
</a>

</div>
</header>

## Introduction

Telegram transformer is a library that makes it simple for you to transform telegram message to any markup.

## Getting started

### Installation

```shellscript
$ npm install telegram-transformer
```

or

```shellscript
$ yarn add telegram-transformer
```

### Example

```js
import formatText, { htmlFormatters } from 'telegram-transformer';
import { MessageEntity } from 'typegram';

const text =
  'Hello @username #awesome_hashtag $USD /start@jobs_bot https://telegram.org do-not-reply@telegram.org +1-212-555-0123 bold text italic text underlined text strikethrough text spoiler message monowidth string monowidth block text_link';
const entities: MessageEntity[] = [
  { offset: 6, length: 9, type: 'mention' },
  { offset: 16, length: 16, type: 'hashtag' },
  { offset: 25, length: 7, type: 'bold' },
  { offset: 33, length: 4, type: 'cashtag' },
  { offset: 38, length: 15, type: 'bot_command' },
  { offset: 54, length: 20, type: 'url' },
  { offset: 75, length: 25, type: 'email' },
  { offset: 101, length: 15, type: 'phone_number' },
  { offset: 117, length: 9, type: 'bold' },
  { offset: 127, length: 11, type: 'italic' },
  { offset: 139, length: 5, type: 'underline' },
  { offset: 144, length: 10, type: 'underline' },
  { offset: 144, length: 5, type: 'bold' },
  { offset: 155, length: 18, type: 'strikethrough' },
  { offset: 174, length: 15, type: 'spoiler' },
  {
    offset: 223,
    length: 9,
    type: 'text_link',
    url: 'https://telegram.org/',
  },
];

const formatted = formatText(text, entities, { formatters: htmlFormatters });

console.log(formatted);

/*
{
  text: "Hello <a href='https://t.me/username'>@username</a> <a href='#awesome_hashtag'>#awesome_<strong>hashtag</strong></a> $USD /start@jobs_bot <a href='https://telegram.org'>https://telegram.org</a> <a href='mailto:do-not-reply@telegram.org'>do-not-reply@telegram.org</a> <a href='tel:+1-212-555-0123'>+1-212-555-0123</a> <strong>bold text</strong> <i>italic text</i> <u>under</u><u><strong>lined</strong> text</u> <strike>strikethrough text</strike> <span class='spoiler-hover'>spoiler message</span> monowidth string monowidth block <a href='https://telegram.org/'>text_link</a>",
  entities: [
    { offset: 6, length: 45, type: 'mention' },
    { offset: 16, length: 16, type: 'hashtag' },
    { offset: 88, length: 24, type: 'bold' },
    { offset: 117, length: 4, type: 'cashtag' },
    { offset: 122, length: 15, type: 'bot_command' },
    { offset: 138, length: 55, type: 'url' },
    { offset: 194, length: 72, type: 'email' },
    { offset: 267, length: 49, type: 'phone_number' },
    { offset: 317, length: 26, type: 'bold' },
    { offset: 344, length: 18, type: 'italic' },
    { offset: 363, length: 12, type: 'underline' },
    { offset: 144, length: 10, type: 'underline' },
    { offset: 378, length: 22, type: 'bold' },
    { offset: 410, length: 35, type: 'strikethrough' },
    { offset: 446, length: 50, type: 'spoiler' },
    {
      offset: 530,
      length: 45,
      type: 'text_link',
      url: 'https://telegram.org/'
    }
  ]
}
*/
```

### Custom transformer

```js
import formatText, { htmlFormatters } from 'telegram-transformer';
import { MessageEntity } from 'typegram';

const text = 'Hello @username #awesome_hashtag';
const entities: MessageEntity[] = [
  { offset: 6, length: 9, type: 'mention' },
  { offset: 16, length: 16, type: 'hashtag' },
];

const formatters = {
  mention: (entityText: string, entity: MessageEntity, text: string) => ({
    before: '<awesome-mention>',
    after: '</awesome-mention>',
    text: entityText,
  }),
  hashtag: (entityText: string, entity: MessageEntity, text: string) => ({
    before: '<span class="hashtag">',
    after: '</span>',
    text: entityText,
  }),
};

const formatted = formatText(text, entities, { formatters });

console.log(formatted);

/*
{
  text: 'Hello <awesome-mention>@username</awesome-mention> <span class="hashtag">#awesome_hashtag</span>',
  entities: [
    { offset: 6, length: 44, type: 'mention' },
    { offset: 51, length: 45, type: 'hashtag' }
  ]
}
*/
```
