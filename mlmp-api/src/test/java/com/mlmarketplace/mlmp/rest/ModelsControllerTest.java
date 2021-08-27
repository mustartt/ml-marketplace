package com.mlmarketplace.mlmp.rest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import com.mlmarketplace.mlmp.dto.ModelResponseDTO;
import com.mlmarketplace.mlmp.models.ModelType;
import com.mlmarketplace.mlmp.service.ModelsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ModelsController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ModelsControllerTest {

    private static final String ENDPOINT = "/api";

    private static final String MODEL_NAME = "model name";
    private static final ModelType MODEL_TYPE = ModelType.DATASET;
    private static final String FRAMEWORK = "tensorflow";
    private static final ModelResponseDTO MODEL_MOCK = ModelResponseDTO.builder()
            .name(MODEL_NAME)
            .framework(FRAMEWORK)
            .build();

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private Page<ModelResponseDTO> pageMock;

    @MockBean
    private ModelsService modelsServiceMock;

    @Test
    void whenModelsEndpointIsCalleThenReturnPageResponse() throws Exception {
        when(modelsServiceMock.getAllModels(any(Pageable.class)))
                .thenReturn(pageMock);
        when(pageMock.getContent()).thenReturn(List.of(MODEL_MOCK));
        when(pageMock.getPageable()).thenReturn(PageRequest.of(0, 10));
        when(pageMock.getSize()).thenReturn(1);
        when(pageMock.getTotalElements()).thenReturn(1L);

        mockMvc.perform(get(ENDPOINT + "/models"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value(MODEL_NAME))
                .andExpect(jsonPath("$.content[0].type").value(MODEL_TYPE.getDatabaseValue()))
                .andExpect(jsonPath("$.content[0].framework").value(FRAMEWORK))
                .andExpect(jsonPath("$.page").value("0"))
                .andExpect(jsonPath("$.page_size").value("10"))
                .andExpect(jsonPath("$.size").value(1))
                .andExpect(jsonPath("$.total_size").value(1));
    }


}
