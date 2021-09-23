package com.mlmarketplace.mlmp.service;

import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.Dataset;
import com.mlmarketplace.mlmp.models.Model;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.repository.CartItemRepository;
import com.mlmarketplace.mlmp.repository.DatasetRepository;
import com.mlmarketplace.mlmp.repository.ModelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShoppingCartService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ModelsRepository modelsRepository;

    @Autowired
    private DatasetRepository datasetRepository;

    public List<CartItem> listCartItems(User customer) {
        List<CartItem> cartItems = cartItemRepository.findByUser(customer);
        return  cartItems;
    }

    public Integer addProduct(Long productId, Integer addedQuantity, User customer, String type) {
        Integer quantity = addedQuantity;
        CartItem cartItem = null;
        if (type.equals("Model")) {
            Optional<Model> model = modelsRepository.getModelById(productId);
            if (!model.isPresent()) {
                return -1;
            }
            cartItem = cartItemRepository.findByUserAndModel(customer, model.get());
            if (cartItem != null) {
                quantity = cartItem.getQuantity() + addedQuantity;
                cartItem.setQuantity(quantity);
                return quantity;
            } else {
                cartItem = CartItem.builder()
                        .quantity(quantity)
                        .model(model.get())
                        .user(customer)
                        .build();
            }
        } else {
            Optional<Dataset> dataset = datasetRepository.getDatasetById(productId);
            if (!dataset.isPresent()) {
                return -1;
            }
            cartItem = cartItemRepository.findByUserAndDataset(customer, dataset.get());
            if (cartItem != null) {
                quantity = cartItem.getQuantity() + addedQuantity;
                cartItem.setQuantity(quantity);
                return quantity;
            } else {
                cartItem = CartItem.builder()
                        .quantity(quantity)
                        .dataset(dataset.get())
                        .user(customer)
                        .build();
            }
        }
        cartItemRepository.save(cartItem);
        return quantity;
    }

    public boolean removeProduct(Long productId, User customer, String type) {
        boolean exist = false;
        if (type.equals("Model")) {
            Optional<Model> model = modelsRepository.getModelById(productId);
            if (!model.isPresent()) {
                return false;
            }
            if (cartItemRepository.findByUserAndModel(customer, model.get()) != null) {
                exist = true;
                cartItemRepository.deleteByUserAndModel(customer, model.get());
            }
        } else {
            Optional<Dataset> dataset = datasetRepository.getDatasetById(productId);
            if (!dataset.isPresent()) {
                return false;
            }
            if (cartItemRepository.findByUserAndDataset(customer, dataset.get()) != null) {
                exist = true;
                cartItemRepository.deleteByUserAndDataset(customer, dataset.get());
            }
        }
        return exist;
    }

    public double updateQuantityProduct(Long productId, Integer quantity, User customer, String type) {
        CartItem cartItem = null;
        if (type.equals("Model")) {
            Optional<Model> model = modelsRepository.getModelById(productId);
            if (!model.isPresent()) {
                return -1;
            }
            cartItemRepository.updateQuantityModel(quantity, customer.getId(), productId);
            cartItem = cartItemRepository.findByUserAndModel(customer, model.get());
        } else {
            Optional<Dataset> dataset = datasetRepository.getDatasetById(productId);
            if (!dataset.isPresent()) {
                return -1;
            }
            cartItemRepository.updateQuantityDataset(quantity, customer.getId(), productId);
            cartItem = cartItemRepository.findByUserAndDataset(customer, dataset.get());
        }
        if (cartItem != null) {
            return cartItem.getTotal();
        } else {
            return -1;
        }
    }
}
