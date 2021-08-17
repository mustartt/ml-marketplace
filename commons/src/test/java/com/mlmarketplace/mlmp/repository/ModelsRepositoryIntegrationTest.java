package com.mlmarketplace.mlmp.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.ModelType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import lombok.RequiredArgsConstructor;

@ContextConfiguration(classes = ModelsRepository.class)
@EnableJpaRepositories(basePackages = "com.mlmarketplace.mlmp.repository")
@EntityScan(basePackages = "com.mlmarketplace.mlmp.models")
@DataJpaTest
@ActiveProfiles(profiles = "integration")
@AutoConfigureTestDatabase(replace = NONE)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class ModelsRepositoryIntegrationTest {

    private static final String MODEL_NAME = "model_1";
    private static final ModelType MODEL_TYPE = ModelType.MODEL;

    private final ModelsRepository modelsRepository;

    @Test
    void whenSaveThenEntityIsPersisted() {
        final var toSave = createBasicEntity(MODEL_NAME, MODEL_TYPE);

        modelsRepository.save(toSave);
        final var id = toSave.getId();

        final var persistedEntity = modelsRepository.findById(id);
        assertThat(persistedEntity).isPresent();

        final var entity = persistedEntity.get();
        assertThat(entity.getName()).isEqualTo(MODEL_NAME);
        assertThat(entity.getType()).isEqualTo(MODEL_TYPE);
    }

    @Test
    void whenFindAllWithPageableThenPageIsReturned() {
        final var entities = IntStream.range(0, 10).boxed()
                .map(val ->
                        createBasicEntity(
                                "model-" + val,
                                val % 2 == 0 ? ModelType.MODEL : ModelType.DATASET
                        )
                )
                .collect(Collectors.toList());

        modelsRepository.saveAll(entities);

        final var pageRequest = PageRequest.of(0, 5);
        final var pageResult = modelsRepository.findAll(pageRequest);

        assertThat(pageResult.getTotalElements()).isEqualTo(10);
        assertThat(pageResult.getSize()).isEqualTo(5);
    }

    private Model createBasicEntity(final String name, final ModelType type) {
        return Model.builder()
                .name(name)
                .type(type)
                .build();
    }

}
