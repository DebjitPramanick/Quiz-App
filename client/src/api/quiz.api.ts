import api from "./config";

export const startQuiz = async () => {
  try {
    let result = await api.post(`/quiz/start`, {});
    result = result.data;
    return result;
  } catch (error: any) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};

export const getQuiz = async (quizId: string) => {
  try {
    let result = await api.get(`/quiz/${quizId}`);
    result = result.data;
    return result;
  } catch (error: any) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};

export const saveAnswerForQuestion = async ({
  quizId,
  data,
}: {
  quizId: string;
  data: {
    questionId: string;
    answers: string[];
    timeTaken: number;
  };
}): Promise<any> => {
  try {
    let result = await api.post(`/quiz/${quizId}/answer`, data);
    result = result.data;
    return result;
  } catch (error: any) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};

export const finishQuiz = async (quizId: string) => {
  try {
    let result = await api.post(`/quiz/${quizId}/finish`);
    result = result.data;
    return result;
  } catch (error: any) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};

export const getQuizReport = async (quizId: string) => {
  try {
    let result = await api.post(`/quiz/${quizId}/report`);
    result = result.data;
    return result;
  } catch (error: any) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};
