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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ContextConfiguration(classes = ModelsRepository.class)
@EnableJpaRepositories(basePackages = "com.mlmarketplace.mlmp.repository")
@EntityScan(basePackages = "com.mlmarketplace.mlmp.models")
@DataJpaTest
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class ShoppingCartRepositoryIntegrationTest {

    private final CartItemRepository cartRepo;

    private static final String MODEL_NAME = "model_1";
    private final ModelsRepository modelsRepository;

    private static final String DATASET_NAME = "dataset_1";
    private final DatasetRepository datasetRepository;

    private static final String USER_NAME = "user_1";
    private static final String USER_PASSWORD = "123";
    private static final String USER_EMAIL = "123@123.com";

    private static final String USER_NAME_PUBLISHER = "publisher_1";
    private static final String USER_PASSWORD_PUBLISHER = "123";
    private static final String USER_EMAIL_PUBLISHER = "123@123.com";
    private static final User PUBLISHER = createBasicUser(USER_NAME_PUBLISHER, USER_PASSWORD_PUBLISHER, USER_EMAIL_PUBLISHER);

    private final UserRepository userRepository;

    @Test
    public void testAddModelToCartItem() {
        final var model = createBasicModel(MODEL_NAME);
        modelsRepository.save(model);

        User customer = createBasicUser(USER_NAME, USER_PASSWORD, USER_EMAIL);
        userRepository.save(customer);

        CartItem newItem = new CartItem();
        newItem.setUser(customer);
        newItem.setModel(model);

        CartItem saved = cartRepo.save(newItem);
        assertTrue(saved.getId() > 0);
        assertThat(saved.getUser().getId()).isEqualTo(customer.getId());
        assertThat(model.getId()).isEqualTo(newItem.getModel().getId());
        assertThat(model.getId()).isEqualTo(saved.getModel().getId());
        assertThat(saved.getId()).isEqualTo(newItem.getId());
    }

    @Test
    public void testAddDatasetToCartItem() {
        final var dataSet = createBasicDataset(DATASET_NAME);
        datasetRepository.save(dataSet);

        User customer = createBasicUser(USER_NAME, USER_PASSWORD, USER_EMAIL);
        userRepository.save(customer);

        CartItem newItem = new CartItem();
        newItem.setUser(customer);
        newItem.setDataset(dataSet);


        CartItem saved = cartRepo.save(newItem);
        assertTrue(saved.getId() > 0);
        assertThat(saved.getUser().getId()).isEqualTo(customer.getId());
        assertThat(dataSet.getId()).isEqualTo(newItem.getDataset().getId());
        assertThat(dataSet.getId()).isEqualTo(saved.getDataset().getId());
        assertThat(saved.getId()).isEqualTo(newItem.getId());

    }

    @Test
    public void testGetCartItemsByCustomer() {
        User customer = createBasicUser(USER_NAME, USER_PASSWORD, USER_EMAIL);
        userRepository.save(customer);

        final var dataSet = createBasicDataset(DATASET_NAME);
        datasetRepository.save(dataSet);
        CartItem newItemDataset = new CartItem();
        newItemDataset.setUser(customer);
        newItemDataset.setDataset(dataSet);
        CartItem savedDataset = cartRepo.save(newItemDataset);

        final var model = createBasicModel(MODEL_NAME);
        modelsRepository.save(model);
        CartItem newItemModel = new CartItem();
        newItemModel.setUser(customer);
        newItemModel.setModel(model);
        CartItem savedModel = cartRepo.save(newItemModel);

        assertEquals(cartRepo.findByUser(customer).size(), 2);
    }

    private static Model createBasicModel(final String name) {
        return Model.builder()
                .name(name)
                .publisher(PUBLISHER)
                .build();
    }

    private static Dataset createBasicDataset(final String name) {
        return Dataset.builder()
                .name(name)
                .publisher(PUBLISHER)
                .build();
    }

    private static User createBasicUser(final String username, final String password, final String email) {
        return User.builder()
                .username(username)
                .password(password)
                .email(email)
                .build();
    }

}
