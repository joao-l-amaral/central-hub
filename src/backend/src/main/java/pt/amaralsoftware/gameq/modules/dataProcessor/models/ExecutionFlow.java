package pt.amaralsoftware.gameq.modules.dataProcessor.models;

import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ExecutionFlow {
    public final Logger log = LoggerFactory.getLogger(ExecutionFlow.class);

    public abstract void executeWorkflow(ParsingGamesOrder order);

    public static final String METADATA_DOWNLOAD_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp/input/Metadata.zip" : "tmp/input/Metadata.zip";
    public static final String FILE_DOWNLOAD_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp/input" : "tmp/input";
    public static final String FILE_EXTRACTED_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp" : "tmp/output";

    public static final String FILE_HASH_FILE = "hash.txt";
}
