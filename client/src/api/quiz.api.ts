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

export const saveAnswerForQuestion = async ({
  quizId,
  data,
}: {
  quizId: string;
  data: any;
}): Promise<any> => {
  try {
    let result = await api.post(`/quiz/${quizId}/answer`, {});
    result = result.data;
    return result;
  } catch (error: any) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};

export const finishQuiz = async () => {
  try {
    let result = await api.post(`/quiz/finish`, {});
    result = result.data;
    return result;
  } catch (error: any) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};
