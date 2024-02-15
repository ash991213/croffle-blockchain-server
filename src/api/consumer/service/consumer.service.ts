import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

import { CustomLogger } from 'src/config/logger/custom.logger.config';

import * as AWS from 'aws-sdk';

@Injectable()
export class ConsumerService {
    constructor(
        @Inject('CROFFLE_BLOCKCHAIN_SERVER_LOG')
        private readonly logger: CustomLogger,
    ) {}

    @SqsMessageHandler(process.env.AWS_SQS_NAME, false)
    async handleMessage(message: AWS.SQS.Message) {
        this.logger.logMethodEntry(this.constructor.name, this.handleMessage.name, message);

        const obj: any = JSON.parse(message.Body) as {
            message: string;
            date: string;
        };

        const { data } = JSON.parse(obj.Message);

        console.log(data);
    }
}
