import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DatasourceServiceBase } from "./base/datasource.service.base";

@Injectable()
export class DatasourceService extends DatasourceServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
