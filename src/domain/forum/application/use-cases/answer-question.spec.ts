import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../../enterprise/entities/answer'
import type { AnswerRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '2',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
