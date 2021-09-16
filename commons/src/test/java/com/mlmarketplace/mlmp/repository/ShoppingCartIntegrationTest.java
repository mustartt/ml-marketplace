package com.mlmarketplace.mlmp.repository;


import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.User;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ContextConfiguration(classes = ModelsRepository.class)
@EnableJpaRepositories(basePackages = "com.mlmarketplace.mlmp.repository")
@EntityScan(basePackages = "com.mlmarketplace.mlmp.models")
@DataJpaTest
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class ShoppingCartIntegrationTest {

    private final CartItemRepository cartRepo;

    private static final String MODEL_NAME = "model_1";
    private final ModelsRepository modelsRepository;

    private static final String DATASET_NAME = "dataset_1";
    private final DatasetRepository datasetRepository;

    private static final String USER_NAME = "user_1";
    private static final String USER_PASSWORD = "123";
    private static final String USER_EMAIL = "123@123.com";
    private final UserRepository userRepository;

    @Test
    public void testAddModelToCartItem() {
        final var model = createBasicModel(MODEL_NAME);
        modelsRepository.save(model);

        User customer = createBasicUser(USER_NAME, USER_PASSWORD, USER_EMAIL);
        userRepository.save(customer);

        CartItem newItem = new CartItem();
        newItem.setCustomer(customer);
        newItem.setModel(model);

        CartItem saved = cartRepo.save(newItem);
        assertTrue(saved.getId() > 0);
        assertThat(saved.getUser_id()).isEqualTo(customer.getId());
        assertThat(model.getId()).isEqualTo(newItem.getModel_id());
        assertThat(model.getId()).isEqualTo(saved.getModel_id());
        assertThat(saved.getId()).isEqualTo(newItem.getId());
    }

    @Test
    public void testAddDatasetToCartItem() {
        final var dataSet = createBasicDataset(DATASET_NAME);
        datasetRepository.save(dataSet);

        User customer = createBasicUser(USER_NAME, USER_PASSWORD, USER_EMAIL);
        userRepository.save(customer);

        CartItem newItem = new CartItem();
        newItem.setCustomer(customer);
        newItem.setDateset(dataSet);

        CartItem saved = cartRepo.save(newItem);
        assertTrue(saved.getId() > 0);
        assertThat(saved.getUser_id()).isEqualTo(customer.getId());
        assertThat(dataSet.getId()).isEqualTo(newItem.getDataset_id());
        assertThat(dataSet.getId()).isEqualTo(saved.getDataset_id());
        assertThat(saved.getId()).isEqualTo(newItem.getId());

    }

    private Model createBasicModel(final String name) {
        return Model.builder()
                .name(name)
                .build();
    }

    private Dataset createBasicDataset(final String name) {
        return Dataset.builder()
                .name(name)
                .build();
    }

    private User createBasicUser(final String username, final String password, final String email) {
        return User.builder()
                .username(username)
                .password(password)
                .email(email)
                .build();
    }

}
