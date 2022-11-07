import { PrismaClient, Group } from '@prisma/client';

export class GroupsService {
  public groups = new PrismaClient().group;

  public async findAllGroups(): Promise<Group[]> {
    return await this.groups.findMany();
  }
}
