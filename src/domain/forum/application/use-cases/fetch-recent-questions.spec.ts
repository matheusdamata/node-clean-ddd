import { InMemoryQuestionsRepository } from '__test__/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from '__test__/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 4),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 2),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 5),
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 5) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 4) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 2) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
