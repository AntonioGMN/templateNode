export interface AppError {
  type: 'not_found' | 'bad_request' | 'unauthorized' | 'forbidden';
  message: string;
}

export function notFound(message): AppError {
  throw { type: 'not_found', message };
}

export function unauthorized(message): AppError {
  throw { type: 'unauthorized', message };
}

export function forbidden(message): AppError {
  throw { type: 'forbidden', message };
}

export function bad_request(message): AppError {
  throw { type: 'bad_request', message };
}
