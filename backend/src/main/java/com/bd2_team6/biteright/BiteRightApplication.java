package com.bd2_team6.biteright;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import com.bd2_team6.biteright.entities.address.*;
import jakarta.persistence.EntityManager;
import java.util.List;

@SpringBootApplication
public class BiteRightApplication implements CommandLineRunner {
	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private EntityManager entityManager;
	public static void main(String[] args) {
		SpringApplication.run(BiteRightApplication.class, args);
	}

	@Override
	public void run (String... args) throws Exception {
		try {
			List<String> tables = entityManager.createNativeQuery("SHOW TABLES").getResultList();
			System.out.println("\n\n\nTabele w bazie:");
			for (String tableName : tables) {
				System.out.println(tableName);
			}
			System.out.println("\n\nKoniec listy tabel.");
		} catch (Exception e) {
			System.out.println(">>> Nie udało się pobrać listy tabel z bazy danych.\n\n\n");
		}

		try{
			Address a = new Address(1, "ul. Kwiatowa 5", "Warszawa", "00001", "Polska");
			addressRepository.save(a);
			System.out.println(">>> Zapisano adres do bazy danych.\n\n\n");
		} catch (Exception e) {
			System.out.println(">>> Nie udało się zapisać adresu do bazy danych.\n\n\n");
		}

	}
}