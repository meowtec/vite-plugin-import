import React from 'react';
import ReactDOM from 'react-dom';
import { Tag } from 'antd-mobile';

ReactDOM.render(
  <div className="tag-container">
    <Tag>aaa</Tag>
    <Tag selected>aaa</Tag>
  </div>,
  document.getElementById('app'),
);
