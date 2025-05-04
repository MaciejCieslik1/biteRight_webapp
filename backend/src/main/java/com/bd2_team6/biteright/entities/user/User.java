package com.bd2_team6.biteright.entities.user;
import com.bd2_team6.biteright.entities.daily_summary.DailySummary;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password_hash")
    private String password_hash; 

    @Column(name="type")
    private String type; 

    // CONSTRUCTORS
    public User() { }

    public User( String username, String email, String password_hash, String type) {
        this.username = username;
        this.email = email;
        this.password_hash = password_hash;
        this.type = type;
    }

    public void printUser() {
        System.out.println(id + ". username: " + username + ", email: " + email + ", type: "+ type + ".\n");
    }

    // RELATION WITH DAILY SUMMARY
    @OneToMany(mappedBy = "user")
    private Set<DailySummary> dailySummaries = new HashSet<>();


    // GETTERS AND SETTERS
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }


    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    

    public String getPassword_hash() {
        return password_hash;
    }
    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
