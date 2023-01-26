export const usernameCheck = /^[a-zA-ZÀ-ÿ0-9]{4,12}$/;
export const emailCheck = /^[A-z0-9-_.]+@[a-z0-9.]+\.[a-z]{2,4}$/;
export const passwordCheck = /^[A-z][A-z0-9]{3,15}$/;
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;