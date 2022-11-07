export enum DefaultTranslationEnum {
  Base = 'base',
}

export interface ITranslation {
  (field: string): string
}
