package com.esporte.taxas.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.esporte.taxas.model.TaxaModel;

@Repository
public interface TaxaRepository extends JpaRepository<TaxaModel, UUID> {
	
	Optional<TaxaModel> findById(Long Id);
	
	void deleteById(Long Id);

}

