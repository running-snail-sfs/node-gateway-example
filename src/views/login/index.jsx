import React, { useCallback  } from 'react';
import { useHistory } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { Button, Form, Icon, Input, Layout } from 'antd';
import { Base64 as base64 } from 'js-base64';
import * as homeAction from '../../redux/home/action';
import styles from './index.less';

export default Form.create({ name: 'login' })(({ form }) => {
  const { getFieldDecorator } = form;
  const history = useHistory();
  const dispatch = useDispatch();
  const login = useCallback(
    (e) => {
      e.preventDefault()
    const callBack=()=>{
      history.push('/home')
    }
    dispatch(homeAction.login({username:'xxxxx', password: base64.encode('xxx')},callBack));
    },
    [],
  );
  return (
    <Layout>
      <div className={styles.content}>
        <Form className={styles['login-form']} onSubmit={login}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号' }],
            })(<Input placeholder="账号" prefix={<Icon type="user" />} size="large" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                placeholder="密码"
                prefix={<Icon type="lock" />}
                size="large"
                type="password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" size="large" type="primary" style={{width:'100%'}}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
});
