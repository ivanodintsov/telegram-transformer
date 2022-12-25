<header>

<h1 align="center">Telegram message transformer</h1>

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
  text: "Hello <a href='https://tg.me/username'>@username</a> <a href='#awesome_hashtag'>#awesome_<strong>hashtag</strong></a> $USD /start@jobs_bot <a href='https://telegram.org'>https://telegram.org</a> <a href='mailto:do-not-reply@telegram.org'>do-not-reply@telegram.org</a> <a href='tel:+1-212-555-0123'>+1-212-555-0123</a> <strong>bold text</strong> <i>italic text</i> <u>under</u><u><strong>lined</strong> text</u> <strike>strikethrough text</strike> <span class='spoiler-hover'>spoiler message</span> monowidth string monowidth block <a href='https://telegram.org/'>text_link</a>",
  entities: [
    { offset: 6, length: 9, type: 'mention' },
    { offset: 53, length: 16, type: 'hashtag' },
    { offset: 89, length: 7, type: 'bold' },
    { offset: 118, length: 4, type: 'cashtag' },
    { offset: 123, length: 15, type: 'bot_command' },
    { offset: 139, length: 20, type: 'url' },
    { offset: 195, length: 25, type: 'email' },
    { offset: 268, length: 15, type: 'phone_number' },
    { offset: 318, length: 9, type: 'bold' },
    { offset: 345, length: 11, type: 'italic' },
    { offset: 364, length: 5, type: 'underline' },
    { offset: 376, length: 10, type: 'underline' },
    { offset: 379, length: 5, type: 'bold' },
    { offset: 411, length: 18, type: 'strikethrough' },
    { offset: 447, length: 15, type: 'spoiler' },
    {
      offset: 531,
      length: 9,
      type: 'text_link',
      url: 'https://telegram.org/'
    }
  ]
}
*/
```
