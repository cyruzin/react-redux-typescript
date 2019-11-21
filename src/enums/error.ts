export enum enValidationError {
  UNEXPECTED = 'Erro inesperado'
}

export enum enValidationMultipleErrors {
  STRING_MIN = 'não atingiu a quantidade mínima de caracteres',
  STRING_MAX = 'atingiu a quantidade máxima de caracteres',
  ANY_REQUIRED = 'é obrigatório',
  ANY_ALLOWONLY = 'possui uma opção não permitida',
  DATE_GREATER = 'precisa ser maior que a data escolhida',
  UNEXPECTED = 'Erro inesperado'
}
