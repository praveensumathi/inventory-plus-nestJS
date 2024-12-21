import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getPublicKey(): string {
    const publicKeyPath = this.configService.get<string>('PUBLIC_KEY_PATH');
    if (!fs.existsSync(publicKeyPath)) {
      throw new Error(`File not found: ${publicKeyPath}`);
    }
    return fs.readFileSync(publicKeyPath, 'utf8');
  }

  getPrivateKey(): string {
    const privateKey = this.configService.get<string>('PRIVATE_KEY_PATH');
    if (!fs.existsSync(privateKey)) {
      throw new Error(`File not found: ${privateKey}`);
    }
    return fs.readFileSync(privateKey, 'utf8');
  }

  getSecretKey(): string {
    return 'My SecretKey';
  }
}
