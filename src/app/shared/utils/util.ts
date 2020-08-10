/**
 * @description
 * Regexp to validate email
 */
export const REGEX_EMAIL =
  '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

/**
 * @description
 * Regexp to validate phone number with format
 * +1 (XXX) XXX-XXXX
 */
export const REGEX_PHONE =
  '^\\+\\d{1,2}\\s\\(?\\d{3}\\)?[\\s]\\d{3}[\\s.-]\\d{4}$';

/**
 * @description
 * Masks the phone with format
 * +1 (XXX) XXX-XXXX
 */
export const MASK_PHONE = [
  '+',
  '1',
  ' ',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/
];
