import { Inject, Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

import { CustomLogger } from 'src/config/logger/custom.logger.config';

import { ConfigService } from '@nestjs/config';

import { SendMessageReqDTO } from 'src/api/producer/dto/producer.dto';

import { uuidUtil } from 'src/util/uuid.util';

@Injectable()
export class ProducerService {
    constructor(
        @Inject('CROFFLE_BLOCKCHAIN_SERVER_LOG')
        private readonly logger: CustomLogger,
        private readonly sqsService: SqsService,
        private readonly configService: ConfigService,
    ) {}

    public async sendMessage(sendMessageReqDTO: SendMessageReqDTO) {
        this.logger.logMethodEntry(this.constructor.name, this.sendMessage.name, sendMessageReqDTO);

        const message: any = JSON.stringify({ from_address: sendMessageReqDTO.from_address, amount: sendMessageReqDTO.amount });
        const uuidId = uuidUtil();

        try {
            await this.sqsService.send(this.configService.get<string>('AWS_SQS_NAME'), {
                id: uuidId,
                body: message,
                groupId: 'auto-refund',
                deduplicationId: sendMessageReqDTO.txid,
            });
        } catch (error) {
            this.logger.logError(this.constructor.name, this.sendMessage.name, error);
        }
    }
}
