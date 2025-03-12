import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(' SimpleMiddleware: Opah ');
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        name: 'Robertinho',
        lastName: 'Oliveira',
      };
    }

    res.setHeader('Cabecalho', 'Do Middleware');

    /* return res.status(404).send({
      message: 'Não encontrado',
    });*/

    next();

    console.log(' SimpleMiddleware: Tchau ');

    res.on('finish', () => {
      console.log('SimpleMiddleware: Acabou');
    });
  }
}
