import React from 'react';
import toast from 'react-hot-toast';

import iconInfo from '../assets/info.svg';
import iconSuccess from '../assets/success.svg';
import iconError from '../assets/error.svg';
import iconWarning from '../assets/warning.svg';

import styles from './styles.module.scss';

const icons = {
  info: iconInfo,
  success: iconSuccess,
  error: iconError,
  warning: iconWarning,
};

export default (type, title, body, onClick = () => {}) => {
  console.log('Toast type is ', type);
  console.log('Toast title is ', title);
  console.log('Toast body is ', body);
  return toast(
    () => (
      <div className={styles.toastInner} onClick={onClick}>
        {console.log('here is okay')}
        <div className={styles.header}>
          <img src={icons[type]} alt={type} className={styles.icon} />
          <span>{title}</span>
        </div>
        {body.length > 0 && <div className={styles.body}>{body}</div>}
      </div>
    ),
    {
      duration: 5000,
      className: styles.toast,
    }
  );
};
