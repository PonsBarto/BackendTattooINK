import { ObjectLiteral, Repository } from "typeorm";

export class BaseFactory<T extends ObjectLiteral> {
  protected modelRepository: Repository<T>;

  constructor(modelRepository: Repository<T>) {
    this.modelRepository = modelRepository;
  }

  protected generateSpecifics(model: T): T {
    return model;
  }

  protected generate(): T {
    let model = this.modelRepository.create();
    model = this.generateSpecifics(model);
    return model;
  }

  createMany(count: number = 1): T[] {
    const generated: T[] = [];

    for (let i = 0; i < count; i++) {
      const item = this.generate();
      generated.push(item);
    }

    return generated;
  }
}
