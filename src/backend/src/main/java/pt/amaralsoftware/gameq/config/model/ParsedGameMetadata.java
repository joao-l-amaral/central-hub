package pt.amaralsoftware.gameq.config.model;

import java.util.Map;

public record ParsedGameMetadata(
        Map<String, Object> fields,
        String platform
) {
    public ParsedGameMetadata(Map<String, Object> fields) {
        this(fields, String.valueOf(fields.get("platform")));
    }
}
