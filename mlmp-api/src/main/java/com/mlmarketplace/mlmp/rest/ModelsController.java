package com.mlmarketplace.mlmp.rest;

import com.mlmarketplace.mlmp.configurations.PageProps;
import com.mlmarketplace.mlmp.dto.ModelResponseDTO;
import com.mlmarketplace.mlmp.dto.PageResponseDTO;
import com.mlmarketplace.mlmp.dto.mapper.PageResponseMapper;
import com.mlmarketplace.mlmp.dto.request.ModelRequest;
import com.mlmarketplace.mlmp.dto.response.ModifyModelResponse;
import com.mlmarketplace.mlmp.service.ModelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api")
@EnableConfigurationProperties(PageProps.class)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@CrossOrigin
public class ModelsController {

    private final ModelsService modelsService;
    private final PageProps pageProps;

    @GetMapping(path = "/models", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResponseDTO<ModelResponseDTO> fetchModels(@Nullable @RequestParam(name = "page") final Integer page,
                                                         @Nullable @RequestParam(name = "size") final Integer pageSize) {
        final var defaultPage = page == null ? 0 : page;
        final var defaultPageSize = pageSize == null ? pageProps.getSize() : pageSize;
        final var pageable = PageRequest.of(defaultPage, defaultPageSize);

        return PageResponseMapper.map(modelsService.getAllModels(pageable));
    }

    @GetMapping("/models/{id}")
    public ModelResponseDTO fetchModels(@PathVariable("id") final Long id) {
        return modelsService.getModelsById(id);
    }

    @PostMapping(value = "/models")
    public ModifyModelResponse addModels(@RequestBody final ModelRequest request) {
        return modelsService.createModel(request);
    }

    @PutMapping(value = "/models/{id}")
    public ModifyModelResponse updateModels(@PathVariable("id") final Long id,
                                            @RequestBody final ModelRequest request) {
        return modelsService.updateModels(id, request);
    }

    @DeleteMapping(value = "/models/{id}")
    public ModifyModelResponse deleteModels(@PathVariable("id") final Long id) {
        return modelsService.deleteModels(id);
    }
}
