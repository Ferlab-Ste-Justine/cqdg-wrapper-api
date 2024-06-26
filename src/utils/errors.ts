import { SetNotFoundError } from '@ferlab/next/lib/sets/setError';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof SetNotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({
      error: getReasonPhrase(StatusCodes.NOT_FOUND),
    });
  } else if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  } else {
    throw err;
  }
};

export const globalErrorLogger = (err: unknown, _req: Request, _res: Response, next: NextFunction): void => {
  console.error('[globalErrorLogger]', err);
  next(err);
};
