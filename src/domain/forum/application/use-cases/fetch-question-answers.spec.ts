import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from '__test__/repositories/in-memory-answers-repository'
import { makeAnswer } from '__test__/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { expect } from 'vitest'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-01'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-01'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-01',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-01'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-01',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
