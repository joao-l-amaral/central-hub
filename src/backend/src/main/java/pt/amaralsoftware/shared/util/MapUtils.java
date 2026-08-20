package pt.amaralsoftware.shared.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MapUtils {

    private static Logger log = LoggerFactory.getLogger(MapUtils.class);

    private static final String REGEX_SPLIT_PATH = "(?<!\\\\)\\.";

    private MapUtils(){}


    public static Map<String,Object> setParam(Map<String,Object> model, String path, Object value) {
        String[] property = path.split(REGEX_SPLIT_PATH);
        if (property.length > 1) {
            String temp = property[0];
            property[0] = StringUtils.remove(property[0], "\\");

            if (!model.containsKey(property[0])) {
                model.put(property[0], setParam(new HashMap<>(), StringUtils.removeStart(path, temp + "."), value));
            }else {
                setParam((Map<String,Object>)model.get(property[0]), StringUtils.removeStart(path, temp + "."), value);
            }

        }else {
            model.put(property[0], value);
        }

        return model;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static Object getProperty(final Map<String,Object> map, String property){
        Object value = null;

        if (map != null) {
            String[] path = property.split(REGEX_SPLIT_PATH,-1);
            if (path.length > 1) {
                String temp = path[0];
                path[0] = StringUtils.remove(path[0], "\\");

                Map<String,Object> child = null;
                if (map.get(path[0]) instanceof List ) {
                    if (((List<?>)(map.get(path[0]))).size() == 1) {
                        child = (Map<String,Object>)((List<?>)(map.get(path[0]))).get(0);
                    }
                }else if (map.get(path[0]) instanceof Map) {
                    child = (Map<String,Object>)map.get(path[0]);
                }

                if (child != null) {
                    value = MapUtils.getProperty(child, StringUtils.removeStart(property, temp + "."));
                }else{
                    return null;
                }

            }else{
                //length == 1
                value = map.get(property);
            }
        }

        return value;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static Map<String,Object> getPropertyMap(final Map<String,Object> map, final String property){
        Object value = getProperty(map, property);
        if (value instanceof Map) {
            return (Map<String,Object>) value;
        }
        return null;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static List<Map<String,Object>> getPropertyList(final Map<String,Object> map, final String property){
        List<Map<String,Object>> value = null;

        Object object = getProperty(map, property);
        if (object instanceof List) {
            value = (List<Map<String,Object>>)object;
        }else if (object instanceof Map){
            value = Arrays.asList((Map<String,Object>)object);
        }else {
            value = new ArrayList<>();
        }

        return value;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static String getPropertyAsString(final Map<String,Object> map, final String property){
        String value = null;
        Object object = getProperty(map, property);
        if (object instanceof String) {
            value = (String) object;
        }else if (object != null){
            value = object.toString();
        }
        return value;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static Boolean getPropertyAsBoolean(final Map<String,Object> map, final String property){
        Boolean value = null;

        Object object = getProperty(map, property);
        if (object instanceof Boolean) {
            value = (Boolean)object;
        }else {
            try{
                value = BooleanUtils.toBooleanObject((String)object);
            }catch(NumberFormatException e){
                log.warn("failed converting number", e);
            }
        }

        return value;



    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static Float getPropertyAsFloat(final Map<String,Object> map, final String property){
        Float value = null;

        Object object = getProperty(map, property);
        if (object instanceof Float) {
            value = (Float)object;
        }else {
            try{
                value = NumberUtils.createFloat(getPropertyAsString(map, property));
            }catch(NumberFormatException e){
                log.warn("failed converting number", e);
            }
        }

        return value;
    }


    /**
     * @param map
     * @param property
     * @return
     */
    public static Double getPropertyAsDouble(final Map<String,Object> map, final String property){
        Double value = null;

        Object object = getProperty(map, property);
        if (object instanceof Double) {
            value = (Double)object;
        }else {
            try{
                value = NumberUtils.createDouble(getPropertyAsString(map, property));
            }catch(@SuppressWarnings("unused") NumberFormatException e){
                log.warn("failed converting number:{}", getPropertyAsString(map, property));
            }
        }

        return value;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static Integer getPropertyAsInteger(final Map<String,Object> map, final String property){
        Integer value = null;

        Object object = getProperty(map, property);
        if (object instanceof Integer) {
            value = (Integer)object;
        }else if (object instanceof Double) {
            value = ((Double)object).intValue();
        }else{
            try{
                value = NumberUtils.createInteger(getPropertyAsString(map, property));
            }catch(@SuppressWarnings("unused") NumberFormatException e){
                log.warn("failed converting number: {}", getPropertyAsString(map, property));
            }
        }

        return value;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static Long getPropertyAsLong(final Map<String,Object> map, final String property){
        Long value = null;

        Object object = getProperty(map, property);
        if (object instanceof Long) {
            value = (Long)object;
        }else if (object instanceof Integer) {
            value = Long.valueOf((Integer)object);
        }else if (object instanceof Double) {
            value = ((Double)object).longValue();
        }else{
            try{
                value = NumberUtils.createLong((String)object);
            }catch(@SuppressWarnings("unused") NumberFormatException e){
                log.warn("failed converting number:{}", getPropertyAsString(map, property));
            }
        }

        return value;
    }

    /**
     * use getPropertyAsZonedDateTime
     * @param map
     * @param property
     * @param pattern
     * @return
     */
    @Deprecated
    public static Date getPropertyAsDate(final Map<String,Object> map, final String property, final String pattern){
        Date value = null;

        String param = null;
        try{
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            param = getPropertyAsString(map, property);
            if (param != null) {
                value = sdf.parse(param);
            }
        } catch (ParseException e) {
            log.warn("fail converting date {}", param, e);
        }

        return value;
    }


    /**
     * @param map
     * @param property
     * @param pattern
     * @return
     */
    public static ZonedDateTime getPropertyAsZonedDateTime(final Map<String,Object> map, final String property, final String pattern){
        ZonedDateTime value = null;

        Object object = getProperty(map, property);
        if (object instanceof ZonedDateTime) {
            value = (ZonedDateTime)object;
        }else {
            try{
                if (object != null) {
                    value = ZonedDateTime.parse((String)object, DateTimeFormatter.ofPattern(pattern));
                }
            } catch (Exception e) {
                log.warn("failed converting date {}", object, e);
            }
        }

        return value;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static ZonedDateTime getPropertyAsZonedDateTime(final Map<String,Object> map, final String property){
        ZonedDateTime value = null;

        Object object = getProperty(map, property);
        if (object instanceof ZonedDateTime) {
            value = (ZonedDateTime)object;
        }else {
            try{
                if (object != null) {
                    value = ZonedDateTime.parse((String)object);
                }
            } catch (@SuppressWarnings("unused") Exception e) {
                log.info("Not a date {}", object);
            }
        }

        return value;
    }

    /**
     * @param <T>
     * @param map
     * @param property
     * @param enumType
     * @return
     */
    public static <T extends Enum<T>> T getPropertyAsEnum(final Map<String,Object> map, final String property, Class<T> enumType){
        T value = null;

        try{
            String param = getPropertyAsString(map, property);
            for(T t : enumType.getEnumConstants()) {
                if (StringUtils.equals(t.name(), param)) {
                    value = t;
                    break;
                }
            }

        } catch (Exception e) {
            log.warn("failed reading {}", e);
        }

        return value;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static List<String> getPropertyAsStringList(final Map<String,Object> map, final String property){
        List<String> value = null;

        Object object = getProperty(map, property);
        if (object instanceof List) {
            value = (List<String>)object;
        }else{
            value = new ArrayList<>();
            log.warn("Not a list {}",(object!= null)?object.getClass().getSimpleName():"null");
        }
        return value;
    }


    /**
     * @param map
     * @param property
     * @param index
     * @return
     */
    public static String getPropertyAsStringListIndex(final Map<String,Object> map, final String property, int index){
        List<String> value = null;

        Object object = getProperty(map, property);
        if (object instanceof List) {
            value = (List<String>)object;
        }
        if (value != null && value.size() > index) {
            return value.get(index);
        }
        return null;
    }

    /**
     * @param map
     * @param property
     * @return
     */
    public static List<Object> getPropertyAsList(final Map<String,Object> map, final String property){
        List<Object> value = null;

        Object object = getProperty(map, property);
        if (object instanceof List) {
            value = (List<Object>)object;
        }else{
            value = new ArrayList<>();
            log.warn("Not a list {}",(object!= null)?object.getClass().getSimpleName():"null");
        }
        return value;
    }

    /**
     * @param map
     * @return
     */
    public static String pretty(Map<String,Object> map) {
        StringBuilder buffer = new StringBuilder();
        flatten("", map).entrySet()
                .stream()
                .sorted(MapUtils::compareKeys)
                .forEach(item->{
                    buffer.append(item.getKey()+"="+item.getValue()+"\n");
                });

        return buffer.toString();
    }

    /**
     * @param m1
     * @param m2
     * @return
     */
    private static int compareKeys(Map.Entry<String,?> m1, Map.Entry<String,?> m2) {
        String[] s1 = m1.getKey().split(REGEX_SPLIT_PATH);
        String[] s2 = m2.getKey().split(REGEX_SPLIT_PATH);
        for (int i = 0; i < s1.length; i++) {
            if (s2.length <= i) {
                return -1;
            }
            if (s1[i].compareTo(s2[i]) != 0) {
                return s1[i].compareTo(s2[i]);
            }
        }
        return 0;
    }

    /**
     * @param root
     * @param map
     * @return
     */
    private static Map<String,Object> flatten(String root, Map<String,Object> map) {
        Map<String,Object> formattedMap = new HashMap<>();

        for (Map.Entry<String,Object> item : map.entrySet()) {
            if (item.getValue() instanceof List) {
                int i = 0;
                for (Object itemList : (List<?>)item.getValue()) {
                    if (itemList instanceof Map) {
                        formattedMap.putAll(flatten(root + "." + item.getKey()+"["+(i++)+"]",(Map<String,Object>)itemList));
                    }else {
                        formattedMap.put(root + "." + item.getKey() +"["+(i++)+"]", itemList);
                    }
                }
            }else if (item.getValue() instanceof Map) {
                formattedMap.putAll(flatten(root + "." +item.getKey(),(Map<String,Object>)item.getValue()));
            }else {
                formattedMap.put(root + "." +item.getKey(), item.getValue());
            }
        }

        return formattedMap;
    }

}