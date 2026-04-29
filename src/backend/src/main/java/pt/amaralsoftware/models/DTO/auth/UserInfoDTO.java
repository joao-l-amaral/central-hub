package pt.amaralsoftware.models.DTO.auth;

import java.io.Serializable;

public class UserInfoDTO implements Serializable {
    private String name;
    private String idToken;

    public UserInfoDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }
}
