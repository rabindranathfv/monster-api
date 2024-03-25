import { ApiProperty } from '@nestjs/swagger';

class PageMetaDto {
  @ApiProperty({
    example: 2,
    description: 'Page number',
  })
  readonly page: number;

  @ApiProperty({
    example: 5,
    description: 'amount of elements per page',
  })
  readonly limit: number;

  @ApiProperty({
    example: 20,
    description: 'total items',
  })
  readonly itemCount: number;

  @ApiProperty({
    example: 2,
    description: 'amount of pages',
  })
  readonly pageCount: number;

  @ApiProperty({
    example: true,
    description: 'Indicate if has previous page',
  })
  readonly hasPreviousPage: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicate if has next page',
  })
  readonly hasNextPage: boolean;

  constructor(page: number, limit: number, itemCount: number) {
    this.page = page;
    this.limit = limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

export class PaginatedDto<T> {
  @ApiProperty()
  readonly data: T[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: T[], page: number, limit: number, itemCount: number) {
    this.data = data;
    this.meta = new PageMetaDto(page, limit, itemCount);
  }
}
