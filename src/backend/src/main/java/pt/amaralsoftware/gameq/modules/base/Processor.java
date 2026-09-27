package pt.amaralsoftware.gameq.modules.base;

import org.apache.commons.lang3.BooleanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.base.models.Order;
import pt.amaralsoftware.gameq.modules.base.models.ProcessState;

import java.time.ZonedDateTime;

public abstract class Processor<TState extends ProcessState> {
    public final Logger log = LoggerFactory.getLogger(Processor.class);

    public Order<TState> order = null;

    public abstract void executeFlow();
    protected abstract Order<TState> createOrder(String targetEntity);

    public Order<TState> run(String targetEntity) {
        this.order = createOrder(targetEntity);
        boolean workFlowFinished = false;
        while (BooleanUtils.isNotTrue(workFlowFinished)) {
            executeFlow();
            workFlowFinished = order.getState().isTerminal();
        }

        this.order.setEndTime(ZonedDateTime.now());

        return this.order;
    }
}
