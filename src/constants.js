// https://randomuser.me/api?results=1&page=1&seed=abc

export const BASE_URL = "https://randomuser.me/api?";
export const URL_EXTENSION = "seed=abc";
export const RENDER_ID = "#userData";
export const ADD_BTN_ID = "#addUserBtn";
export const MAP_ID = "#map";

let page = 1;
let result = 0;

export function getPage() {
  return page;
}
export function increasePage() {
  page = page + 1;
}
export function getResult() {
  return result;
}
export function increaseResult() {
  result = result + 1;
}
