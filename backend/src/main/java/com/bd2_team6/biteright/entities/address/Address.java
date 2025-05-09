package com.bd2_team6.biteright.entities.address;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
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

    public Address(Integer user_id, String address, String city, String postal_code, String country) {
        this.user_id = user_id;
        this.address = address;
        this.city = city;
        this.postal_code = postal_code;
        this.country = country;
    }
}
