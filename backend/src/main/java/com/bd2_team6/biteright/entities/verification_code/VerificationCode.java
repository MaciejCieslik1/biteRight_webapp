package com.bd2_team6.biteright.entities.verification_code;

import java.time.LocalDateTime;

import com.bd2_team6.biteright.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "verification_code")
public class VerificationCode {
    @Id
    @Column(name = "code_id")
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int codeId;

    @Column(name = "code")
    private String code;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public VerificationCode(String code, LocalDateTime expirationDate, User user) {
        this.code = code;
        this.expirationDate = expirationDate;
        this.user = user;
    }
}
