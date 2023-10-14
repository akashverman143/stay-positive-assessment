const initialState= {
  quizData: [],
  celebrityData: [],
  cardData: [],
  questionsData: {},
  spinner: false,
  questionSpinner: false,
  retainedAnswer: {
    "quiz_id": 0,
    "mappings": [] 
  },
  resultData: {},
  resultSpinner: false
};

export const reducer = (state=initialState, action) => {
  const newState= {...state};

  switch(action.type){
    case 'LOAD_CELEBRITY_DATA_SPINNER': 
      newState.spinner= action.value;
      break;
    case 'LOAD_CELEBRITY_DATA_SUCESS':
      console.log("data in reducer", action.data);
      action.data.forEach(data => data.name = `${data.first} ${data.last}`)
      newState.celebrityData= action.data;
      break;
    case 'CARD_DATA_SAVED':
      const fileteredData = newState.cardData && newState.cardData.length > 0 && newState.cardData.filter(card => card.id !== action.data.id);
      newState.cardData = fileteredData && fileteredData.length > 0 ? [...fileteredData, action.data] : [action.data];
      break;
    case 'UPDATE_NAME':
      const filteredOne = newState.cardData && newState.cardData.length > 0 && newState.cardData.filter(card => card.id === action.data.id);
      filteredOne.forEach(d => d.name = action.data.name);
      console.log("card data in reducer", filteredOne);
      newState.cardData = filteredOne;
      break;
    case 'LOAD_QUIZ_QUESTION_DATA_SUCESS':
      newState.questionsData = action.data;
      break;
    case 'LOAD_QUIZ_QUESTION_DATA_SPINNER':
      newState.questionSpinner = action.value;
      break;
    case 'RETAIN_QUESTION_ANSWERS':
      console.log("action.data", action.data);
      const data = newState.retainedAnswer.mappings;

      newState.retainedAnswer = {
        "quiz_id": newState.questionsData.questions[0].quiz,
        "mappings": [...data, action.data]
      };
      break;
    case 'LOAD_QUIZ_RESULT_DATA_SUCESS': 
      newState.resultData= action.data;
      break;
    case 'LOAD_QUIZ_RESULT_DATA_SPINNER':
      newState.resultSpinner= action.value;
      break;          
  }

  return newState;
}