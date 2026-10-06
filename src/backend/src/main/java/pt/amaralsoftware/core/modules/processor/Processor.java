package pt.amaralsoftware.core.modules.processor;

import org.apache.commons.lang3.BooleanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.core.modules.processor.models.Order;
import pt.amaralsoftware.core.modules.processor.models.ProcessState;

import java.time.ZonedDateTime;

public abstract class Processor<TState extends ProcessState> {
    public final Logger log = LoggerFactory.getLogger(Processor.class);

    public Order<TState> order = null;

    public abstract void executeFlow();
    protected abstract Order<TState> createOrder(String targetEntity);

    private Order<TState> getOrder() {
        boolean workFlowFinished = false;
        while (BooleanUtils.isNotTrue(workFlowFinished)) {
            executeFlow();
            workFlowFinished = order.getState().isTerminal();
        }

        this.order.setEndTime(ZonedDateTime.now());

        return this.order;
    }

    public Order<TState> run() {
        this.order = createOrder(null);
        return getOrder();
    }

    public Order<TState> run(String targetEntity) {
        this.order = createOrder(targetEntity);
        return getOrder();
    }
}
