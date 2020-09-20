import React, { PureComponent } from "react";
import styles from "./styles/quizz-type.module.scss";
import classnames from "classnames";

export default class QuizzType extends PureComponent {
  state = {
    type: "choose",
  };

  handleChange = (type) => {
    const { onChange } = this.props;
    this.setState({
      type,
    });
    if (onChange) onChange(type);
  };

  componentDidMount() {
    const { type } = this.state;
    const { onChange } = this.props;
    if (onChange) onChange(type);
  }

  render() {
    const { type } = this.state;
    return (
      <div className={styles.variant_quizz}>
        <div className={classnames(styles.item, styles.active)}>
          <input
            type="radio"
            name="variant-quizz"
            id="variant-quizz-1"
            value="choose"
            checked={type === "choose"}
            onChange={({ target }) => {
              this.handleChange(target.value);
            }}
          />
          <label htmlFor="variant-quizz-1">
            <div className={styles.icon}>icon</div>
            <p>Choosing questions</p>
          </label>
        </div>
        <div className={styles.item}>
          <input
            type="radio"
            name="variant-quizz"
            id="variant-quizz-2"
            value="evaluation"
            checked={type === "evaluation"}
            onChange={({ target }) => {
              this.handleChange(target.value);
            }}
          />
          <label htmlFor="variant-quizz-2">
            <div className={styles.icon}>icon</div>
            <p>Evaluation</p>
          </label>
        </div>
        <div className={styles.item}>
          <input
            type="radio"
            name="variant-quizz"
            id="variant-quizz-3"
            value="discussion"
            checked={type === "discussion"}
            onChange={({ target }) => {
              this.handleChange(target.value);
            }}
          />
          <label htmlFor="variant-quizz-3">
            <div className={styles.icon}>icon</div>
            <p>Discussion</p>
          </label>
        </div>
        <div className={styles.item}>
          <input
            type="radio"
            name="variant-quizz"
            id="variant-quizz-4"
            value="video-recording"
            checked={type === "video-recording"}
            onChange={({ target }) => {
              this.handleChange(target.value);
            }}
          />
          <label htmlFor="variant-quizz-4">
            <div className={styles.icon}>icon</div>
            <p>Video recording</p>
          </label>
        </div>
      </div>
    );
  }
}
