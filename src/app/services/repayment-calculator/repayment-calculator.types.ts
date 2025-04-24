export interface IRepaymentData {
    date: Date;
    remainingDebt: number;
    interest: number;
    rate: number;
    repayment: number;
}

export interface IContractDetails {
    amount: number;
    normalInterestRate: number;
    repaymentRate: number;
    fixedInterestRate: number;
}