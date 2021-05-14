import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

export default function downloadFile(url, parmas) {
  const download = (response) => {
    // for IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let filename = response.headers; // 下载后文件名
      filename = filename['content-disposition'];
      const [, name] = filename.split(';');
      const [, fileName] = name.split('filename=');
      filename = fileName;
      const blob = new Blob([response.data]);
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      let filename = response.headers; // 下载后文件名
      filename = filename['content-disposition'];
      const [, name] = filename.split(';');
      const [, fileName] = name.split('filename=');
      filename = decodeURIComponent(fileName);
      const blob = new Blob([response.data]);
      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob); // 创建下载的链接
      downloadElement.href = href;
      downloadElement.download = filename;
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    }
  };
  axios({
    method: 'get',
    url: `${url}?${qs.stringify(parmas)}`,
    responseType: 'blob',
  }).then((response) => {
    const reader = new FileReader();
    reader.readAsText(response.data, 'utf-8');
    reader.onload = (e) => {
      try {
        // 说明是普通对象数据
        const jsonData = JSON.parse(e.target.result);
        message.error(jsonData.message);
      } catch (err) {
        // 流文件
        download(response);
      }
    };
  });
}
