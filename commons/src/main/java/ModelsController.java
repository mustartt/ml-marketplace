
import com.sun.org.apache.xpath.internal.operations.Mod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Date;
import java.util.List;

@RestController
public class ModelsController {
    @Autowired
    private ModelsService modelsService;

    @GetMapping("/models")
    public ResponseEntity<List<Models>> fetchAllModels() {
        List<Models> list = modelsService.getAllModels();
        return new ResponseEntity<List<Models>> (list, HttpStatus.OK);
    }

    @GetMapping("/models/{id}/")
    public ResponseEntity<Models> fetchModels(@PathVariable("id") Long id) {
        Models m = modelsService.getModelsById(id);
        return new ResponseEntity<Models>(m, HttpStatus.OK);
    }

    @PostMapping(value="/models")
    public ResponseEntity<Void> addModels(@RequestBody Models models, UriComponentsBuilder builder) {
        boolean flag = modelsService.addModels(models);
        if (!flag) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/models/{id}").buildAndExpand(models.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    /*TODO: Add authentication.
    *       Allowing user to change more attributes.
    *  */
    @PutMapping(value="/models/{id}/")
    public ResponseEntity<Models> updateModels(@PathVariable("id") Long id, @RequestBody String description) {
        Models m = modelsService.getModelsById(id);
        m.setDescription(description);
        m.setUpdateDate(new Date());
        modelsService.updateModels(m);
        return new ResponseEntity<Models>(m, HttpStatus.OK);
    }

    @DeleteMapping(value="/models/{id}/")
    public ResponseEntity<Void> deleteModels(@PathVariable("id") Long id) {
        modelsService.deleteModels(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
