export class ResponseMonsterNameDto {
  readonly first: string;
  readonly last: string;
  readonly title: string;
}

export class ResponseMonsterDto {
  readonly _id: string;
  readonly name: ResponseMonsterNameDto;
  readonly gender: string;
  readonly description: string;
  readonly nationality: string[];
  readonly image: string;
  readonly goldBalance?: number;
  readonly speed?: number;
  readonly health?: number;
  readonly secretNotes?: string;
  readonly monsterPassword: string;
}
