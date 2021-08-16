import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModelsService {
    @Autowired
    private ModelsRepository modelsRepository;

    public List<Models> getAllModels() {
        List<Models> models = new ArrayList<>();
        modelsRepository.findAll().forEach(m -> models.add(m));
        return models;
    }

    public Models getModelsById(long id) {
        Models models = modelsRepository.findById(id).get();
        return models;
    }

    public boolean addModels(Models models) {
        if (modelsRepository.findById(models.getId()).get() != null) {
            return false;
        }
        modelsRepository.save(models);
        return true;
    }

    public void updateModels(Models models) {
        modelsRepository.save(models);
    }

    public void deleteModels(long id) {
        deleteModels(getModelsById(id));
    }

    public void deleteModels(Models models) {
        modelsRepository.delete(models);
    }
}
