import {IsEnum, IsInt, IsOptional, Max, Min} from "class-validator";
import {Type} from "class-transformer";

enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export class PageOptionsDto {
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    @Type(() => Number)
    get skip(): number {
        return (this.page! - 1) * this.take!;
    }
}