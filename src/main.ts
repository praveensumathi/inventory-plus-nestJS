import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
// import { registerAutoMapDecorators } from "./utils/automap-utility";
// import * as path from "path";
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //registerAutoMapDecorators(path.join(__dirname, "./entities"));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Inventory Plus")
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
