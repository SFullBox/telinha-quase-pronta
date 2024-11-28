package com.esporte.taxas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esporte.taxas.DAO.UITeste;
import com.esporte.taxas.model.TaxaModel;
import com.esporte.taxas.repository.TaxaRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("taxas") // 
public class taxaController{

	    @Autowired
	    private TaxaRepository repository;
	    @Autowired
	    private UITeste dao;

	    @GetMapping
	    public List<TaxaModel> ListaUsuarios () {
	    	return (List<TaxaModel>) dao.findAll();	    	
	    }
	    @PostMapping
	    public TaxaModel CriarUsuarios(@RequestBody TaxaModel partida) {
	    	TaxaModel partidaNova = dao.save(partida);
	    	return partidaNova;
	    }
	    
	    @PutMapping
	    public TaxaModel AlterarUsuarios(@RequestBody TaxaModel partida) {
	    	TaxaModel partidaNova = dao.save(partida);
	    	return partidaNova;
	    }
	    @DeleteMapping("/{Id}")
	    @Transactional
	    public Optional<TaxaModel> ExcluirPartida(@PathVariable Long Id) {
	    	Optional<TaxaModel> partidaE = dao.findById(Id);
	    	dao.deleteById(Id);
	    	return partidaE;
	  }
	}