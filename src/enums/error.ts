export enum enValidationError {
  UNEXPECTED = 'Erro inesperado',
  EMAIL_UNAVAILABLE = 'E-mail indisponível'
}

export enum enValidationMultipleErrors {
  STRING_MIN = 'não atingiu a quantidade mínima de caracteres',
  STRING_MAX = 'atingiu a quantidade máxima de caracteres',
  STRING_BASE = 'precisa ser uma string',
  ANY_REQUIRED = 'é obrigatório',
  ANY_ALLOWONLY = 'possui uma opção não permitida',
  DATE_GREATER = 'precisa ser maior que a data escolhida',
  UNEXPECTED = 'Erro inesperado'
}
