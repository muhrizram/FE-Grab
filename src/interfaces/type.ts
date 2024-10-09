export type MonthData = {
  month: string;
  completed: number;
  canceled: number;
};

export type StatisticResponse = {
  [year: string]: MonthData[];
};
