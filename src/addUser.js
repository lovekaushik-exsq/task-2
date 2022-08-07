import {
  BASE_URL,
  URL_EXTENSION,
  getResult,
  getPage,
  increasePage,
  increaseResult,
} from "./constants.js";
import { fetchData } from "../utilities/fetch.js";

export async function addUser() {
  let users;
  increaseResult();
  let url = `${BASE_URL}results=${getResult()}&page=${getPage()}&${URL_EXTENSION}`;
  users = await fetchData(url);
  if (!users) {
    console.log("some internal error occurred or data undefined");
    increasePage();
    result = 0;
    url = `${BASE_URL}results=${getResult()}&page=${getPage()}&${URL_EXTENSION}`;
    users = await fetchData(url);
  }
  let last_user_added = users[users.length - 1];
  return last_user_added;
}
