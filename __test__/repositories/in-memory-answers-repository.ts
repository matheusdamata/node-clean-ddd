import type { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const item = this.items.find((item) => item.id.toString() === id)

    if (!item) return null

    return item
  }
}
