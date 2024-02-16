import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';

import { CustomLoggerModule } from 'src/module/custom.logger.module';
import { Web3Module } from 'src/api/web3/web3.module';

import { ConfigService } from '@nestjs/config';
import { ConsumerService } from 'src/api/consumer/service/consumer.service';

import * as AWS from 'aws-sdk';

@Module({
    imports: [
        CustomLoggerModule,
        SqsModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                AWS.config.update({
                    region: configService.get<string>('AWS_REGION'),
                    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
                    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
                });

                return {
                    consumers: [
                        {
                            name: configService.get<string>('AWS_SQS_NAME'),
                            queueUrl: configService.get<string>('AWS_SQS_URL'),
                            region: configService.get<string>('AWS_REGION'),
                        },
                    ],
                };
            },
        }),
        Web3Module,
    ],
    providers: [ConsumerService],
    exports: [ConsumerService],
})
export class ConsumerModule {}
