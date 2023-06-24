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
  VNP_VERSION,
  VNP_TMNCODE,
  VNP_SECRETKEY,
  VNP_URL,
  VNP_RETURNURL_CREATEPAYMENT,
  VNP_AFTERPAYMENT_URL,
  REDISTTL,
  PROTOCOL,
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
  port: PORT || 3334,
  broker_url: BROKERRURL || 'localhost:9092',
  redisUrl: REDISURL || 'redis://:skindex2023@localhost:6379',
  redisTtl: REDISTTL || 10,
  vnpay: {
    vnp_Version: VNP_VERSION || '2.1.0',
    vnp_TmnCode: VNP_TMNCODE || 'SKDEX001',
    vnp_secretKey: VNP_SECRETKEY || 'SJXRLJURDYWQJCYGXCZYYQNHVYACUPFB',
    vnp_Url: VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    vnp_ReturnURL_CreatePayment:
      VNP_RETURNURL_CREATEPAYMENT || 'https://www.google.com/',
  },
  protocol: PROTOCOL || 'http',
});
