import { REMOVE_QUIZZ_OPTIONS } from './constants';

const removeQuizzOption = (type, index, cb) => (disptach, getState) => {
  const store = getState();

  const quizzOptions = { ...store.jobs.quizzOptions };
  const quizzItem = quizzOptions[type].slice();
  if (quizzItem.length > 0) {
    quizzItem.splice(index, 1);
  }
  quizzOptions[type] = [...quizzItem];
  disptach({ type: REMOVE_QUIZZ_OPTIONS, payload: quizzOptions });
  if (cb) cb(quizzOptions);
};

export default removeQuizzOption;
