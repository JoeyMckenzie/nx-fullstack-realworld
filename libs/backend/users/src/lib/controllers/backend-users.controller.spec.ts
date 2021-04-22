import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { BackendUsersController } from './backend-users.controller';

describe('BackendUsersController', () => {
  let controller: BackendUsersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CommandBus],
      controllers: [BackendUsersController],
    }).compile();

    controller = module.get(BackendUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
