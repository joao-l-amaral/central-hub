package pt.amaralsoftware.shared.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import pt.amaralsoftware.application.config.RegisterCustomModuleCustomizer;

import java.util.Map;

public class MapSerializer {
    private static ObjectMapper mapper = initializeMapper();

    static ObjectMapper initializeMapper() {
        ObjectMapper mapper = new ObjectMapper();
        new RegisterCustomModuleCustomizer().customize(mapper);
        return mapper;
    }

    /**
     * Deserializes a POJO into a Map
     *
     * @param obj the POJO
     * @return the Map Object
     */
    public static Map<String, Object> fromObjToMap(Object obj) {
        return mapper.convertValue(obj, Map.class);
    }

    /**
     * Deserializes a JSON string into a POJO
     *
     * @param data the Map Object
     * @param clazz the class of the POJO
     * @return the POJO object
     */
    public static <T> T fromMapToObj(Map data, Class<T> clazz) {
        return mapper.convertValue(data, clazz);
    }
}
