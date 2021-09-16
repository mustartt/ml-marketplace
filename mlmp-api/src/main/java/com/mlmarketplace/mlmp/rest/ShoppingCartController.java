package com.mlmarketplace.mlmp.rest;

import com.mlmarketplace.mlmp.dto.CartItemResponse;
import com.mlmarketplace.mlmp.dto.mapper.CartItemResponseMapper;
import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/cart")
@RequiredArgsConstructor
public class ShoppingCartController {
    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping("/")
    public List<CartItemResponse> showShoppingCart(@RequestBody final User user) {
        List<CartItem> cartItems = shoppingCartService.listCartItems(user);
        List<CartItemResponse> responses = new ArrayList<>();
        for (CartItem c : cartItems) {
            responses.add(CartItemResponseMapper.map(c));
        }
        return responses;
    }


    //TODO: Replace the return value of the method with required type.
    @PostMapping("/add/{pid}/{qty}")
    public String addProductToCart(@PathVariable("pid") Long productId,
                                   @PathVariable("qty") Integer quantity,
                                   @RequestBody final User user,
                                   @RequestBody final String type) {
        shoppingCartService.addProduct(productId, quantity, user, type);
        return quantity + " of the product is added to your shopping cart.";
    }

    //TODO: Replace the return value of the method with required type.
    @PostMapping("/update/{pid}/{qty}")
    public String updateQuantity(@PathVariable("pid") Long productId,
                                   @PathVariable("qty") Integer quantity,
                                   @RequestBody final User user,
                                   @RequestBody final String type) {
        double newPrice = shoppingCartService.updateQuantityProduct(productId, quantity, user, type);
        if (newPrice == -1) {
            return "Error. Something went wrong.";
        }
        return String.valueOf(newPrice);
    }

    //TODO: Replace the return value of the method with required type.
    @PostMapping("/remove/{pid}")
    public String removeProductFromCart(@PathVariable("pid") Long productId,
                                        @RequestBody final User user,
                                        @RequestBody final String type) {
        if (shoppingCartService.removeProduct(productId, user, type)) {
            return "Successfully removed product from cart.";
        }
        return "Error. Something went wrong.";
    }

}
