import { IValidationErrors } from 'interfaces/error';

import { enValidationError, enValidationMultipleErrors } from 'enums/error';

function checkMultipleErrorsType(type: string, path: string): string {
  const errorType = type.replace('.', '_').toUpperCase();

  for (const enError in enValidationMultipleErrors) {
    if (enError === errorType) {
      return `O campo ${path} ${enValidationMultipleErrors[enError]}`;
    }
  }
  return enValidationMultipleErrors.UNEXPECTED;
}

function handleMultipleErrors(errors: Array<IValidationErrors>): string {
  return (
    errors &&
    errors
      .map(error => checkMultipleErrorsType(error.type, error.path))
      .join(' | ')
  );
}

function checkErrorsType(message: string): string {
  if (!message.includes('-')) return message;

  const errorType = message.replace(/-|\s/g, '_').toUpperCase();
  for (const enError in enValidationError) {
    if (enError === errorType) {
      return enValidationError[enError];
    }
  }
  return enValidationError.UNEXPECTED;
}

export function handleError(error: any): string {
  const { message } = error;
  if (message) return checkErrorsType(message);
  return handleMultipleErrors(error) || enValidationError.UNEXPECTED;
}
