import {HttpContext, HttpParams} from "@angular/common/http";

export type SortDirection = 'ASC' | 'DESC';

export type FilterOperator =
  | 'EQUALS' | 'NOT_EQUALS'
  | 'GT' | 'GTE' | 'LT' | 'LTE'
  | 'CONTAINS' | 'IN';

export interface SortCriterion {
  field: string;
  direction: SortDirection;
}

export interface FilterCriterion {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface SearchRequest {
  page: number;
  pageSize: number;
  sort?: SortCriterion[];
  filters?: FilterCriterion[];
}

export interface PaginationPage<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface RequestOptions {
  params?: HttpParams | Record<string, unknown>;
  headers?: Record<string, string>;
  context?: HttpContext;
}

