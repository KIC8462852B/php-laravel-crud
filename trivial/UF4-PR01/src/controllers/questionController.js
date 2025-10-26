import {
  fetchQuestions,
  validateAnswer,
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} from '../services/questionService.js';

export const getQuestions = async (req, res) => {
  try {
    const amount = parseInt(req.query.amount);
    const userId = req.user?.userId || null;

    const questions = await fetchQuestions(amount, userId);

    return res.status(200).json({ questions });
  } catch (error) {
    console.error('ERROR - getQuestions:', error);
    return res.status(500).json({ message: 'Error fetching questions' });
  }
};

export const checkAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    const userId = req.user.userId;

    const result = await validateAnswer(questionId, answer, userId);

    if (!result.status) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({
      correct: result.isCorrect,
      scoreBefore: result.scoreBefore,
      scoreAfter: result.scoreAfter
    });

  } catch (error) {
    console.error('ERROR - checkAnswer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// CRUD PARA QUESTIONS

export const create = async (req, res) => {
  try {
    const question = await createQuestion({ ...req.body, userId: req.user.userId });
    return res.status(201).json(question);
  } catch (error) {
    console.error('ERROR - create question:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findAll = async (req, res) => {
  try {
    const questions = await getAllQuestions(req.user.userId);
    return res.status(200).json(questions);
  } catch (error) {
    console.error('ERROR - get all questions:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findById = async (req, res) => {
  try {
    const question = await getQuestionById(req.params.id, req.user.userId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.status(200).json(question);
  } catch (error) {
    console.error('ERROR - get question by id:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const update = async (req, res) => {
  try {
    const question = await updateQuestion(req.params.id, req.body, req.user.userId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.status(200).json(question);
  } catch (error) {
    console.error('ERROR - update question:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const question = await deleteQuestion(req.params.id, req.user.userId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.status(200).json({ message: 'Question deleted' });
  } catch (error) {
    console.error('ERROR - delete question:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
