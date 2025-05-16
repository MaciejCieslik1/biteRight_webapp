package com.bd2_team6.biteright.controllers.requests.add_requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class AddressAddRequest {
    private String address;
    private String city;
    private String postalCode;
    private String country;
}
