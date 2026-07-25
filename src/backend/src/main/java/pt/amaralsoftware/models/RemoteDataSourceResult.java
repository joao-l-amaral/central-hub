package com.alticelabs.netq.models.application;

import java.util.List;

public class RemoteDataSourceResult<T> {
    private List<T> records;
    private Integer top;
    private Integer skip;
    private Long totalRecordCount;
    private Integer totalDistinctRecordCount;

    public RemoteDataSourceResult() {
    }

    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }

    public Integer getTop() {
        return top;
    }

    public void setTop(Integer top) {
        this.top = top;
    }

    public Integer getSkip() {
        return skip;
    }

    public void setSkip(Integer skip) {
        this.skip = skip;
    }

    public Long getTotalRecordCount() {
        return totalRecordCount;
    }

    public void setTotalRecordCount(Long totalRecordCount) {
        this.totalRecordCount = totalRecordCount;
    }

    public Integer getTotalDistinctRecordCount() {
        return totalDistinctRecordCount;
    }

    public void setTotalDistinctRecordCount(Integer totalDistinctRecordCount) {
        this.totalDistinctRecordCount = totalDistinctRecordCount;
    }
}
