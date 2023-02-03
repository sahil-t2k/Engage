import { createLogger, stdSerializers} from 'bunyan';
// import { createStream, createLogger, stdSerializers} from 'bunyan-kafka';

    
export const logger = createLogger({
    name: 'engage-theme-logs',
    stream: process.stdout,
    // stream: {
    //   level: 'info',
    //   type: 'raw',
    //   stream: createStream({
    //     kafka: {
    //       topic: 'themelogs',
    //       client: {
    //         kafkaHost: '103.136.36.27:9092'
    //       }
    //     }
    //   })
    // },
    // log INFO and above to stdout    
    serializers: {
      req: reqSerializer,
      res: stdSerializers.res,
      err: stdSerializers.err
    },
  });
  
  // logger.addStream({
  //   level: 'info',
  //   type: 'raw',
  //   stream: bunyanKafka.createStream({
  //     kafka: {
  //       topic: 'themelogs',
  //       client: {
  //         kafkaHost: '103.136.36.27:9092'
  //       }
  //     }
  //   })
  // });

 export function reqSerializer(req) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      remoteAddress: req.remoteAddress,
      pathName:req.pathName,
      port:req.port
    };
  }

//import kafkaStream from 'kafka-stream';
// var KafkaStream = require('kafka-stream');
// LOGGER = bunyan.createLogger({
//     name: 'kafka-bunyan-test',
//     level: bunyan.TRACE
// });
 
//  kafkaStream = new KafkaStream({
//     kafka: {
//         connectionString:'103.136.36.27:9092'
//     },
//     topic: 'bunyan-kafka-topic'
// });
 
// kafkaStream.on('ready', function () {
//     LOGGER.addStream({
//         level: bunyan.INFO,
//         stream: kafkaStream
//     });
 
//     // Now you can log
//     LOGGER.info('Come on you target for faraway laughter, come on you stranger, you legend, you martyr, and shine!');
// });