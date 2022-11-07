import { NextFunction, Request, Response } from 'express';
import { Group } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { UserService } from '@services/users.service';
import { GroupsService } from '@services/groups.service';

export class GroupsController {
  public groupsService = new GroupsService();

  public getGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllGroupsData: Group[] = await this.groupsService.findAllGroups();

      res.status(200).json({ data: findAllGroupsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
