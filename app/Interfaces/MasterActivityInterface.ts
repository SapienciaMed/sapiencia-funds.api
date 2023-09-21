export interface IMasterActivity {
    id: number;
    name: string
    totalValue: number;
    codProgramCode: number;
    description?:string;
}

export interface IMasterActivityFilters {
    codProgramCode?: number;

}
  