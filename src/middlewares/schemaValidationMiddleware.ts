import { Request, Response, NextFunction } from 'express';

export default function validateSchema(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const responseError = {
      abortEarly: false,
      messages: {
        'string.email': 'O campo de email deve ser um endereço de email válido',
        'any.required': 'O campo {{#label}} é não foi enviado',
        'any.only':
          'O campo {{#label}} deve ser uma das opções: pizza, sobremesa, lanche, açaí, bebidas',
      },
    };

    const validation = schema.validate(req.body, responseError);

    if (validation.error) {
      console.log(validation.error.details[0].message);
      return res.status(400).send(validation.error.details[0].message);
    }

    return next();
  };
}
