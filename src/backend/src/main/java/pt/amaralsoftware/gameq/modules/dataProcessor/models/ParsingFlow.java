package pt.amaralsoftware.gameq.modules.dataProcessor.models;

import org.apache.commons.lang3.SystemUtils;

public abstract class ParsingFlow {
    public abstract ParsingResult executeWorkflow(GameQParsingStates currentState);

    public static final String METADATA_DOWNLOAD_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp/input/Metadata.zip" : "tmp/input/Metadata.zip";
    public static final String FILE_DOWNLOAD_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp/input" : "tmp/input";
    public static final String FILE_EXTRACTED_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp" : "tmp/output";

    public static final String FILE_HASH_FILE = "hash.txt";

}
