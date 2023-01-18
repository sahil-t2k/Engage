import { createLogger, stdSerializers } from 'bunyan';


    
export const logger = createLogger({
    name: 'myapp',
    stream: process.stdout,
    // log INFO and above to stdout    
    serializers: {
      req: reqSerializer,
      res: stdSerializers.res,
      err: stdSerializers.err
    },
  });

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

 