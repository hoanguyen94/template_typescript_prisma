import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'skindex-routines',
      brokers: [process.env.BROKERURL],
      requestTimeout: 5000,
      retry: {
        retries: 3,
      },
    },
    consumer: {
      groupId: 'routines',
    },
  },
};
