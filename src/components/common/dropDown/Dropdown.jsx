import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.css';

export default function Dropdown(props) {
  const [repeat, setRepeat] = useState(null);
  const [dropVisibility, setDropVisibility] = useState(false);

  useEffect(() => {
    if (props.dropOpen) {
      clearTimeout(repeat);
      setRepeat(null);
      setDropVisibility(true);
    } else {
      setRepeat(
        setTimeout(() => {
          setDropVisibility(false);
        }, 370)
      );
    }
  }, [props.dropOpen]);

  return (
    <article
      className={`${styles.dropdown} ${
        props.dropOpen ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'
      }`}
    >
      {dropVisibility && props.children}
    </article>
  );
}
