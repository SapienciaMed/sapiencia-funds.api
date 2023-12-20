export interface IRemnantFilters{
    announcement: number,
    fund: number,
    trust: number,
    page: number,
    perPage: number
}

export interface IRemnant {
    id:            number;
    announcement:  string;
    trust:         number;
    communityFund: number;
    remaining:     string;
    averageCost:   string;
    quotas:        number;
    quotaResource: string;
    residual:      string;
    userModified?:  null;
    dateModified?:  null;
    userCreate?:    string;
    dateCreate?:    Date;
    idProgram:     number;
}
export interface IRemnantUpdate {    
    remaining:     number;
    averageCost:   number; 
    
    communityFund:number;
    quotas:number
    quotaResource:number;
    residual:number;

}
