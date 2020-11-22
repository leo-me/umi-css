import React from 'react';
import styles from './index.less';

import data from './imgMap.json';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  handleOnload = (imgTarget) => {
    let url = imgTarget.getAttribute('url');

    let img = new Image();
    img.src = url;

    img.onload = () => {
      let w = img.width;
      let h = img.height;
      let height = Math.floor(imgTarget.width * h / w);
      imgTarget.src = url;

      imgTarget.style.gridRowEnd = `span ${~~(height / 10)}`;
    };
  };

  componentDidMount() {
    this.imgRef.current.childNodes.forEach(item => {
      this.handleOnload(item);
    });
  }

  render() {
    let data1 = [];
    let data2 = [];
    let data3 = [];

    data.forEach((item, idx) => {
      if (idx % 3 === 0) {
        data1.push(item.img);
      }
      if (idx % 3 === 1) {
        data2.push(item.img);
      }
      if (idx % 3 === 2) {
        data3.push(item.img);
      }
    });
    return (
      <div>
        <h1 className={styles.title}>瀑布流1</h1>
        <div className={styles.container1}>
          <div className={styles.column}>
            {data1.map((item) => (
              <img className={styles.item} src={item} />
            ))}
          </div>
          <div className={styles.column}>
            {data2.map((item) => (
              <img className={styles.item} src={item} />
            ))}
          </div>
          <div className={styles.column}>
            {data3.map((item) => (
              <img className={styles.item} src={item} />
            ))}
          </div>
        </div>
        <h1 className={styles.title}>瀑布流2</h1>
        <div className={styles.container2} ref={this.imgRef}>
          {data.map((item) => {
            return (
              <img
                className={styles.item}
                url={item.img}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default Page;
