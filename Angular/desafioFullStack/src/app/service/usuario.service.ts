import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario = new Usuario();
  constructor( private http: HttpClient) { }


  cadastrar(usuario: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>("http://localhost:8080/usuario", usuario)
  }

  buscarTodos() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>("http://localhost:8080/usuario")
  }

  buscarUm(id: number) : Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuario/id.${id}`)
  }

  mudarUsuario(usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>("http://localhost:8080/usuario", usuario)
  }

  deletarUsuario(id:number) : Observable<Usuario>{
    return this.http.delete<Usuario>(`http://localhost:8080/usuario/deletar.${id}`)
  }
}
