package pt.amaralsoftware.gameq.modules.base.models;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

public class Order<T extends ProcessState> implements Serializable {
    private String id;
    private T state;
    private String targetEntity;
    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
    private DiagnosticMessage diagnosticMessage;

    public Order() {
    }

    public Order(String targetEntity) {
        this.id = String.valueOf(UUID.randomUUID());
        this.startTime = ZonedDateTime.now();
        this.targetEntity = targetEntity;
    }

    public String getTargetEntity() {
        return targetEntity;
    }

    public void setTargetEntity(String targetEntity) {
        this.targetEntity = targetEntity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public T getState() {
        return state;
    }

    public void setState(T state) {
        this.state = state;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public DiagnosticMessage getDiagnosticMessage() {
        return diagnosticMessage;
    }

    public void setDiagnosticMessage(DiagnosticMessage diagnosticMessage) {
        this.diagnosticMessage = diagnosticMessage;
    }
}
