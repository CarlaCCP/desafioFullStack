package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Usuario;

public interface RepositoryUsuario extends JpaRepository<Usuario, Long> {

	
	
}
