export const USERNAME_REGEX = /^[A-Za-z0-9]{3,12}$/;
export const EMAIL_REGEX = /^[A-z0-9-_.]+@[a-z0-9.]+\.[a-z]{2,4}$/;
export const PASSWORD_REGEX = /^[A-z][A-z0-9]{3,15}$/;

export const DESCRIPTION_REGEX = /^[A-zÀ-ÿ0-9-_.()!$%@?&=+"' \n]{2,500}$/;
export const COMMENT_REGEX = /^[A-zÀ-ÿ0-9-_.()!$%@?&=+"' ]{2,500}$/;

export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;