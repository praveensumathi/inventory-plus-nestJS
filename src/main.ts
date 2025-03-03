import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import "reflect-metadata";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("PropertyPulse")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (document.components?.schemas) {
    Object.values(document.components.schemas).forEach((schema: any) => {
      if (schema.type === "object") {
        schema.additionalProperties = false; // Instead of deleting, explicitly set to false
      }
    });
  }

  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
