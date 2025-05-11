package com.bd2_team6.biteright.entities.address;

import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.address.AddressRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class AddressTest {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private TestEntityManager entityManager;

    private User testUser;
    private Address testAddress;

    @BeforeEach
    public void setUp() {
        // Tworzymy testowego użytkownika
        testUser = new User();
        testUser.setFirstName("John");
        testUser.setLastName("Doe");
        entityManager.persistAndFlush(testUser); // Persistujemy użytkownika

        // Tworzymy adres
        testAddress = new Address(testUser, "123 Main St", "Springfield", "12345", "USA");
    }

    @Test
    public void shouldSaveAddress() {
        // Zapisz adres do bazy danych
        Address savedAddress = addressRepository.save(testAddress);

        // Sprawdź, czy zapisany adres jest poprawny
        assertThat(savedAddress).isNotNull();
        assertThat(savedAddress.getAddressId()).isGreaterThan(0);
        assertThat(savedAddress.getAddress()).isEqualTo("123 Main St");
        assertThat(savedAddress.getCity()).isEqualTo("Springfield");
        assertThat(savedAddress.getPostalCode()).isEqualTo("12345");
        assertThat(savedAddress.getCountry()).isEqualTo("USA");
        assertThat(savedAddress.getUser()).isEqualTo(testUser);
    }

    @Test
    public void shouldFindAddressByUser() {
        // Zapisz adres do bazy danych
        entityManager.persistAndFlush(testAddress);

        // Wyszukaj adres według użytkownika
        Address foundAddress = addressRepository.findById(testAddress.getAddressId()).orElse(null);

        // Sprawdź, czy znaleziony adres jest zgodny z zapisanym
        assertThat(foundAddress).isNotNull();
        assertThat(foundAddress.getUser()).isEqualTo(testUser);
    }

    @Test
    public void shouldUpdateAddress() {
        // Zapisz adres do bazy danych
        Address savedAddress = addressRepository.save(testAddress);
        savedAddress.setCity("New City");

        // Zaktualizuj adres
        Address updatedAddress = addressRepository.save(savedAddress);

        // Sprawdź, czy zmiana została zapisana
        assertThat(updatedAddress.getCity()).isEqualTo("New City");
    }

    @Test
    public void shouldDeleteAddress() {
        // Zapisz adres do bazy danych
        Address savedAddress = addressRepository.save(testAddress);

        // Usuń adres
        addressRepository.delete(savedAddress);

        // Sprawdź, czy adres został usunięty
        Address deletedAddress = addressRepository.findById(savedAddress.getAddressId()).orElse(null);
        assertThat(deletedAddress).isNull();
    }
}
