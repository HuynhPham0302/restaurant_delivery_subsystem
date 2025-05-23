import { PrismaClient } from '@prisma/client';

class PrismaInstance {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({});
  }

  public getPrisma() {
    return this.prisma;
  }
}

const prismaInstance = new PrismaInstance().getPrisma();

export default prismaInstance;
