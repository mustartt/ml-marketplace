package com.mlmarketplace.mlmp.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.mlmarketplace.mlmp.models.Dataset;
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

@ContextConfiguration(classes = DatasetRepository.class)
@EnableJpaRepositories(basePackages = "com.mlmarketplace.mlmp.repository")
@EntityScan(basePackages = "com.mlmarketplace.mlmp.models")
@DataJpaTest
@ActiveProfiles(profiles = "integration")
@AutoConfigureTestDatabase(replace = NONE)
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class DatasetRepositoryIntegrationTest {

    private static final String DATASET_NAME = "dataset_1";
    private static final ModelType DATASET_TYPE = ModelType.DATASET;
    private final DatasetRepository datasetRepository;

    @Test
    void whenSaveThenEntityIsPersisted() {
        final var toSave = createBasicEntity(DATASET_NAME);

        datasetRepository.save(toSave);
        final var id = toSave.getId();

        final var persistedEntity =datasetRepository.findById(id);
        assertThat(persistedEntity).isPresent();

        final var entity = persistedEntity.get();
        assertThat(entity.getName()).isEqualTo(DATASET_NAME);
    }

    @Test
    void whenFindAllWithPageableThenPageIsReturned() {
        final var entities = IntStream.range(0, 10).boxed()
                .map(val ->
                        createBasicEntity("dataset-" + val)
                )
                .collect(Collectors.toList());

       datasetRepository.saveAll(entities);

        final var pageRequest = PageRequest.of(0, 5);
        final var pageResult =datasetRepository.findAll(pageRequest);

        assertThat(pageResult.getTotalElements()).isEqualTo(10);
        assertThat(pageResult.getSize()).isEqualTo(5);
    }

    private Dataset createBasicEntity(final String name) {
        return Dataset.builder()
                .name(name)
                .build();
    }

}
