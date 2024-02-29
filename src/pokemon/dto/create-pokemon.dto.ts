import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

  // isInt, ispositivo, min1
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  // isStering, Minlength1
  @IsString()
  @MinLength(1)
  name: string
}
