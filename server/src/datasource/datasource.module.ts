import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatasourceModuleBase } from "./base/datasource.module.base";
import { DatasourceService } from "./datasource.service";
import { DatasourceController } from "./datasource.controller";
import { DatasourceResolver } from "./datasource.resolver";

@Module({
  imports: [DatasourceModuleBase, forwardRef(() => AuthModule)],
  controllers: [DatasourceController],
  providers: [DatasourceService, DatasourceResolver],
  exports: [DatasourceService],
})
export class DatasourceModule {}
