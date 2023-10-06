export interface IMaster {
    id?:          number;
    codtlmo:     number;
    name:        string;
    description?: string;
}

export interface IMasterFilters {
    codtlmo?: number;
    page: number;
    perPage: number;
}