import { IsString } from 'class-validator';
export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly bread: string;

  @IsString({ each: true })
  readonly colors: string[];
}
