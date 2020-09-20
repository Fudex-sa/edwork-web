import { CREATE_QUIZZ_OPTIONS } from './constants';

const createQuizzOption = ({ type, data = {} }) => (disptach, getState) => {
  const store = getState();
  const quizzOptions = { ...store.jobs.quizzOptions };
  quizzOptions[type].push(data);

  disptach({ type: CREATE_QUIZZ_OPTIONS, payload: quizzOptions });
};

export default createQuizzOption;
