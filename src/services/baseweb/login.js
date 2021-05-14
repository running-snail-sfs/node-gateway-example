import { postForm } from '../axious';

export function userLogin(params) {
  return postForm('/manage/login/allow/userNameLogin.do', params);
}
