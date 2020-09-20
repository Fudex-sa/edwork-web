import { UPDATE_QUIZZ_OPTIONS } from './constants';

const setQuizzOption = (type, index, data) => (disptach, getState) => {
  const store = getState();
  const quizzOptions = { ...store.jobs.quizzOptions };
  const quizzItem = quizzOptions[type].slice();
  if (quizzItem.length > 0) {
    quizzItem[index || 0] = { ...data };
  }
  quizzOptions[type] = [...quizzItem];
  disptach({ type: UPDATE_QUIZZ_OPTIONS, payload: quizzOptions });
};

export default setQuizzOption;
