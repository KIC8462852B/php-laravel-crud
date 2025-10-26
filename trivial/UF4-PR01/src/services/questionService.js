import Question from '../models/db/questionModel.js';
import User from '../models/db/userModel.js';
import {
  create,
  findAll
} from '../database/crudRepository.js';

// OBTENEMOS PREGUNTAS DE LA API, SI HAY UN USUARIO, LAS GUARDAMOS EN LA DDBB
export const fetchQuestions = async (amount, userId = null) => {
  const url = `https://opentdb.com/api.php?amount=${amount}`;
  const res = await fetch(url);
  const data = await res.json();
  const questions = data.results;

  if (userId) {
    const questionsToSave = questions.map(q => ({ ...q, userId }));
    await Question.insertMany(questionsToSave);
  }

  return questions;
};

// VALIDAMOS LA RESPUESTA DEL USUARIO, ACTUALIZAMOS EL SCORE Y LO GUARDAMOS EN LA DDBB
export const validateAnswer = async (questionId, userAnswer, userId) => {
  const question = await Question.findById(questionId);
  const user = await User.findById(userId);

  if (!question || !user) {
    return { status: false, message: 'Question or user not found' };
  }

  const isCorrect = question.correct_answer === userAnswer;
  const oldScore = user.score;
  const newScore = isCorrect ? oldScore + 1 : oldScore - 0.3;

  user.score = parseFloat(newScore.toFixed(2));
  await user.save();

  return {
    status: true,
    isCorrect,
    scoreBefore: oldScore,
    scoreAfter: user.score
  };
};


// EXPORTS DEL CRUD GENERICO

export const createQuestion = async (data) => {
  return await create(Question, data);
};

export const getAllQuestions = async (userId) => {
  return await findAll(Question, { userId });
};

// EXPORTS DEL CRUD ESPECIFICO PARA USERID  (MONGOOSE)

export const getQuestionById = async (id, userId) => {
  return await Question.findOne({ _id: id, userId });
};

export const updateQuestion = async (id, data, userId) => {
  return await Question.findOneAndUpdate({ _id: id, userId }, data, { new: true });
};

export const deleteQuestion = async (id, userId) => {
  return await Question.findOneAndDelete({ _id: id, userId });
};
