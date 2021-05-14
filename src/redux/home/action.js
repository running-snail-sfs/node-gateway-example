import { userLogin } from '../../services/baseweb/login'
import {message} from 'antd'
export function changeName(params) {
  return (dispatch) => {
    // do someThing 例如接口调用然后保存数据到redux,供全局使用123
    dispatch({ type: 'home/changeName', payload: params });
  };
}
export function login(params,callBack) {
  return () => {
    userLogin(params).then(res=>{
      console.log('登陆成功');
      callBack()
    }).catch(({message:msg})=>{
      console.log('登陆失败');
      message.error('登陆失败')
    })   
  };
}
