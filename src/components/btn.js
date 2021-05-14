import React from 'react';
import PropTypes from 'prop-types';

const DownloadBtn = ({ filename, url }) => {
  const download = () => {
    window.open(url, '_self');
  };

  return <a onClick={() => download()}>{`《${filename}》`}</a>;
};
DownloadBtn.defaultProps = {
  filename: '自定义值',
};

DownloadBtn.propTypes = {
  filename: PropTypes.string,
  url: PropTypes.string,
};
export default DownloadBtn;

