import { Inject, Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

import { CustomLogger } from 'src/config/logger/custom.logger.config';

import { ConfigService } from '@nestjs/config';

import { ResImpl } from 'src/common/res/res.implement';
import { AWS_SEND_MESSAGE_FAILED } from 'src/common/const/error.const';

@Injectable()
export class ProducerService {
    constructor(
        @Inject('CROFFLE_BLOCKCHAIN_SERVER_LOG')
        private readonly logger: CustomLogger,
        private readonly sqsService: SqsService,
        private readonly configService: ConfigService,
    ) {}

    public async sendMessage(body: any) {
        const message: any = JSON.stringify(body);

        try {
            await this.sqsService.send(this.configService.get<string>('AWS_SQS_NAME'), {
                id: 'id',
                body: message,
                groupId: 'test',
                deduplicationId: 'test',
            });
        } catch (error) {
            this.logger.logError(this.constructor.name, this.sendMessage.name, error);
            throw new ResImpl(AWS_SEND_MESSAGE_FAILED);
        }
    }
}
