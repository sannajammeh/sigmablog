import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO } from './models/user.dto';
import { UserEntity } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(user: UserDTO) {
    return from(this.userRepository.save(user));
  }

  findOne(id: UserDTO['id']) {
    return from(this.userRepository.findOneOrFail(id));
  }

  findAll() {
    return from(this.userRepository.find());
  }

  delete(id: UserDTO['id']) {
    return from(this.userRepository.delete(id)).pipe(checkAffected);
  }

  updateOne(id: UserDTO['id'], user: Partial<UserDTO>) {
    return from(this.userRepository.update(id, user)).pipe(checkAffected);
  }
}

function checkAffected(result: Observable<UpdateResult | DeleteResult>) {
  return result.pipe(
    map((action) => {
      if (!action.affected)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return action;
    }),
  );
}
