package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.Usuario;
import repository.RepositoryUsuario;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ControllerUsuario {

	@Autowired
	private RepositoryUsuario repository;
	
	public ControllerUsuario (RepositoryUsuario repository) {
		this.repository = repository;
	}
	
	@GetMapping
	List<Usuario> todos(){
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
	ResponseEntity<Usuario> buscarUm(@PathVariable Long id) {
		return repository.findById(id).map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping
	Usuario novoUsuario (@RequestBody Usuario novoUsuario) {
		return repository.save(novoUsuario);
	}
	
	@PutMapping("/mudar/{id}")
	Usuario mudarUsuario(@RequestBody Usuario novoUsuario, @PathVariable Long id) {
		return repository.findById(id)
				.map(usuario -> {
					usuario.setPrimeiroNome(novoUsuario.getPrimeiroNome());
					usuario.setUltimoNome(novoUsuario.getUltimoNome());
					usuario.setParticipacao(novoUsuario.getParticipacao());
					return repository.save(usuario);
				})
				
				.orElseGet(() ->{
					novoUsuario.setId(id);
					return repository.save(novoUsuario);
				});
	}
	
	@DeleteMapping("/deletar/{id}")
	void deletarUsuario(@PathVariable Long id) {
		repository.deleteById(id);
	}
	
	
}
