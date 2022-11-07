import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { GroupsController } from '@controllers/groups.controller';

export class GroupsRoute implements Routes {
  public path = '/groups';
  public router = Router();
  public groupsController = new GroupsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.groupsController.getGroups);
  }
}
