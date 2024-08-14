import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { expect } from 'vitest'
import { InMemoryQuestionCommentsRepository } from '__test__/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from '__test__/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-01'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-01'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    const { questionComments } = await sut.execute({
      questionId: 'question-01',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-01'),
        }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-01',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
