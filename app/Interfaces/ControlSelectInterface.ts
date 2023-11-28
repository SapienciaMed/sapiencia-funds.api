export interface controlSelectFilter {
    noProject?: number
    validity?: string
    idControlSelect?: number
    idConvocatoria?: number
    id_comuna?: number | number[] | string;
}

export interface controlSelectConsolidado {
    id?: number
    announcement?: string
    consolidatedPreselected?: number
    consolidatedResourceAvailable?: number
    consolidatedGranted?: number
    consolidatedLegalized?: number
    consolidatedFinancialReturns?: number
    Stratum123ResourceAvailable?: number
    Stratum123Granted?: number
    Stratum123Legalized?: number
    Stratum456ResourceAvailable?: number
    Stratum456Granted?: number
    Stratum456Legalized?: number
    idResourcePrioritization?: number
}

export interface consolidado {
    consolidado?: controlSelectConsolidado[]
}