// export const ResultStatusEnum = {
//     'Success': 200,
//     'Not found': 404,
//     'Unavailable': 500,
// } as const;
//
// export type ResultStatus = keyof typeof ResultStatusEnum;
//
//
//
// export class Result<T> {
//     constructor(public readonly result: Nullable<T>,
//                 public readonly status: ResultStatus) {
//     }
//
//     public get hasResult(): boolean {
//         return this.status === 'Success';
//     }
//
//     static notFound<T>(): Result<T> {
//         return new Result<T>(null, 'Not found');
//     }
//
//     static error<T>(): Result<T> {
//         return new Result<T>(null, 'Unavailable');
//     }
//
//     static ok<T>(value: T): Result<T> {
//         return new Result<T>(value, 'Success');
//     }
// }
//
// export function resultToResponse<T>(result: Result<T>): T {
//     if (result.hasResult)
//         return result.result!;
//
//     throw new HttpException(result.status, ResultStatusEnum[result.status]);
// }
