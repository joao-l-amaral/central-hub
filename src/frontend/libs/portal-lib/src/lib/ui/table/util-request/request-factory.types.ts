import {HttpContext, HttpParams} from "@angular/common/http";

export type SortDirection = 'ASC' | 'DESC' | null;

export interface SortState {
  icon: string;
  next: SortDirection;
}

export type FilterOperator =
  | 'EQUALS' | 'NOT_EQUALS'
  | 'GT' | 'GTE' | 'LT' | 'LTE'
  | 'CONTAINS' | 'IN';

export interface SortCriterion {
  field: string;
  direction: SortDirection;
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

