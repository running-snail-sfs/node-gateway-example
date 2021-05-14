import React from 'react';
import { Button } from 'antd';
import { connect, useDispatch } from 'react-redux';
import DownloadBtn from '../../components/index'
import * as homeAction from '../../redux/home/action';
import styles from './index.less';

const Home = ({ name }) => {
  const dispatch = useDispatch();
  const test = (e) => {
    e.preventDefault();
    name == '张三' ? '李四' : '张三';
    dispatch(homeAction.changeName(name == '张三' ? '李四' : '张三'));
  };
  return (
    <div className={styles.home}>
      <div>
        hello world
        {name}
      </div>
      <Button type="primary" onClick={test}>
        改变名字为
        {name == '张三' ? '李四' : '张三'}
      </Button>
      <DownloadBtn filename="前端手册" url="https://docschina.org/" />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { name } = state.home;
  return { name };
};
export default connect(mapStateToProps)(Home);
