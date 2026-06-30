package pt.amaralsoftware.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.models.DTO.application.RemoteDTO;
import pt.amaralsoftware.models.entity.GuiRemoteEntity;
import pt.amaralsoftware.repository.GuiRemoteRepository;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class GuiRemoteService {

    @Inject
    GuiRemoteRepository guiRemoteRepository;

    public List<RemoteDTO> getEnabledGuiRemotes() {
        List<RemoteDTO> remotes = new ArrayList<>();

        List<GuiRemoteEntity> enableRemotes = guiRemoteRepository.find("enable = true").list();

        for(GuiRemoteEntity remote : enableRemotes ) {
            RemoteDTO remoteDTO = new RemoteDTO(
                    remote.getName(),
                    remote.getUrl(),
                    remote.getTitle()
            );

            remotes.add(remoteDTO);
        }

        return remotes;
    }

}

