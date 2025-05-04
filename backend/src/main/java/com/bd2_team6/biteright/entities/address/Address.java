package com.bd2_team6.biteright.entities.address;

import org.hibernate.annotations.IdGeneratorType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Integer address_id ;

    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "address")
    private String address;

    @Column(name="city")
    private String city;

    @Column(name="postal_code")
    private String postal_code;

    @Column(name="country")
    private String country;

    // CONSTRUCTORS
    public Address() { }
    public Address(Integer user_id, String address, String city, String postal_code, String country) {
        this.user_id = user_id;
        this.address = address;
        this.city = city;
        this.postal_code = postal_code;
        this.country = country;
    }
    // GETTERS AND SETTERS
}
