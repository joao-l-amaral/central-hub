package pt.amaralsoftware.shared.util;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONSerializer {
    private static final Logger log = LoggerFactory.getLogger(JSONSerializer.class);
    private static ObjectMapper mapper = initializeMapper();

    static ObjectMapper initializeMapper() {
        return MapSerializer.initializeMapper();
    }

    /**
     * Serializes a POJO in to a JSON String
     *
     * @param obj the POJO
     * @return the JSON string
     */
    public static String toJSON(Object obj) throws IOException {
        String json = mapper.writeValueAsString(obj);
        log.debug(json);
        return json;
    }

    /**
     * Deserializes a JSON string into a POJO
     *
     * @param json the JSON string
     * @param clazz the class of the POJO
     * @return the POJO object
     */
    public static <T> T fromJSON(String json, Class<T> clazz) throws IOException {
        return mapper.readValue(json, clazz);
    }

}
