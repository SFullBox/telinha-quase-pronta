package com.esporte.taxas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "partidas")
public class TaxaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "resultado", nullable = true)
    private String resultado;
    
    @Column(name = "round", nullable = true)
    private int round;
    
    @Column(name = "abates", nullable = true)
    private int abates;
    
    @Column(name = "mortes", nullable = true)
    private int mortes;
    
    @Column(name = "hs", nullable = true)
    private int hs;
    private String imagem;

    // Construtor padrão
    public TaxaModel() {}

    // Construtor com parâmetros
    public TaxaModel(Long id, String resultado, int round, int abates, int mortes, int hs, String imagem) {
        this.id = id;
        this.resultado = resultado;
        this.round = round;
        this.abates = abates;
        this.mortes = mortes;
        this.hs = hs;
        this.imagem = imagem;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public int getAbates() {
        return abates;
    }

    public void setAbates(int abates) {
        this.abates = abates;
    }

    public int getMortes() {
        return mortes;
    }

    public void setMortes(int mortes) {
        this.mortes = mortes;
    }

    public int getHs() {
        return hs;
    }

    public void setHs(int hs) {
        this.hs = hs;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
