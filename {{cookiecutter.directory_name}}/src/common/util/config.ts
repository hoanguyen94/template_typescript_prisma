const {
  DATABASE_URL,
  PORT,
  BROKERRURL,
  REDISURL,
  REGION,
  PUBLISHED_TOPIC_ARN,
  SUBSCRIBED_TOPIC_ARN,
  QUEUEURL,
  ACCESSKEYID,
  SECRETACCESSKEY,
  REDISTTL,
} = process.env;

export default () => ({
  pubSubConfig: {
    region: REGION || 'ap-southeast-1',
    credentials: {
      accessKeyId: ACCESSKEYID,
      secretAccessKey: SECRETACCESSKEY,
    },
    publishedTopicArn:
      PUBLISHED_TOPIC_ARN || '',
    queueURL:
      QUEUEURL || '',
    subscribedTopicArn:
      SUBSCRIBED_TOPIC_ARN || '',
  },
  database_url:
    DATABASE_URL ||
    'postgresql://{{cookiecutter.postgres_user}}:{{cookiecutter.postgres_password}}@localhost:{{cookiecutter.db_port}}/{{cookiecutter.db_name}}?schema=public',
  port: PORT || 8080,
  broker_url: BROKERRURL || 'localhost:9092',
  redisUrl: REDISURL || 'redis://:skindex2023@localhost:6379',
  redisTtl: REDISTTL || 10,
});
