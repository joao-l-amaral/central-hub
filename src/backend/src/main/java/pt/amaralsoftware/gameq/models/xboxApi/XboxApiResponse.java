package pt.amaralsoftware.gameq.models.xboxApi;

public class XboxApiResponse {
    private XboxApiResponseContent content;
    private Integer code;

    public XboxApiResponse() {
    }

    public XboxApiResponseContent getContent() {
        return content;
    }

    public void setContent(XboxApiResponseContent content) {
        this.content = content;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
