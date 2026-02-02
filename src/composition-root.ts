import {Container} from "inversify";
import {UsersRepository} from "./users/repositories/users.repository";
import {UsersQwRepository} from "./users/repositories/users.query.repository";
import {UserService} from "./users/application/user.service";
// import {AuthService} from "./auth/application/auth.service";
import {UsersController} from "./users/routers/controllers/user.controller/usersController";
// import {AuthController} from "./auth/routers/controllers/auth.controller";
import { StaticsController } from './statics/routers/controllers/static.controller/staticsController';
import { StaticService } from './statics/application/static.service';
import { StaticsQueryRepository } from './statics/repositories/statics.query.repository';
import { InteractionController } from './interaction/routers/controllers/interactionСontroller/interactionController';
import { LikeService } from './interaction/application/like.service';
import { LikeRepository } from './interaction/repositories/like.repository';

export const container = new Container();

container.bind(UsersRepository).to(UsersRepository);
container.bind(UsersQwRepository).to(UsersQwRepository);
container.bind(StaticsQueryRepository).to(StaticsQueryRepository);
container.bind(LikeRepository).to(LikeRepository);

container.bind(UserService).to(UserService);
container.bind(LikeService).to(LikeService);
container.bind(StaticService).to(StaticService);

container.bind(UsersController).to(UsersController);
container.bind(InteractionController).to(InteractionController);
container.bind(StaticsController).to(StaticsController);

// container.bind(AuthService).to(AuthService);

// container.bind(AuthController).to(AuthController);

