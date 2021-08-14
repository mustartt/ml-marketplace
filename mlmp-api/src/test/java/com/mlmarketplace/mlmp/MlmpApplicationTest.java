package com.mlmarketplace.mlmp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.Test;

public class MlmpApplicationTest {

    private final MlmpApplication mlmpApplicationMock = mock(MlmpApplication.class);

    @Test
    public void sanityTest() {
        assertThat("123").isEqualTo("123");
        assertThat(mlmpApplicationMock).isNotNull();
    }

}
