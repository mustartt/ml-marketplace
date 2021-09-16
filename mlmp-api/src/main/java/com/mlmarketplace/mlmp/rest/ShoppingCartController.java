package com.mlmarketplace.mlmp.rest;

import com.mlmarketplace.mlmp.dto.CartItemResponse;
import com.mlmarketplace.mlmp.dto.mapper.CartItemResponseMapper;
import com.mlmarketplace.mlmp.models.CartItem;
import com.mlmarketplace.mlmp.models.User;
import com.mlmarketplace.mlmp.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
@RequiredArgsConstructor
public class ShoppingCartController {
    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping("/cart")
    public List<CartItemResponse> showShoppingCart(@RequestBody final User user) {
        List<CartItem> cartItems = shoppingCartService.listCartItems(user);
        List<CartItemResponse> responses = new ArrayList<>();
        for (CartItem c : cartItems) {
            responses.add(CartItemResponseMapper.map(c));
        }
        return responses;
    }
}
