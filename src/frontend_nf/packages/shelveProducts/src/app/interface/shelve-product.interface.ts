export interface ShelveProduct {
    name: string,
    barCode: string,
    shelveCode: string,
    expiryDate: string,
    date: string,
    calories: number,
    weight: number
}

export interface ShelveProductTable extends ShelveProduct {
    daysLeft: number
    isSelected?: boolean
}

export interface ShelveProductCount {
    productName: string
    productCount: string,
    barCode: string,
    calories: number
}
