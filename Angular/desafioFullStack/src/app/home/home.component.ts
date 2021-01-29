import { Component, OnInit } from '@angular/core';
import { ChartType,ChartOptions } from 'chart.js';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Usuario = new Usuario();
  listaUsuario!: Usuario []

  // Teste gráfico
 // Pie
 public pieChartOptions: ChartOptions = {
  responsive: true,
};
public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
public pieChartData: SingleDataSet = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [];

  constructor(private usuarioService: UsuarioService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }


  ngOnInit() {
    this.mostraTodos()
  }

  cadastro(){
    if(this.user.primeiroNome == null || this.user.ultimoNome == null || this.user.participacao == null){
      window.alert("Preencha todos os dados, por favor")
    } else {
      this.usuarioService.cadastrar(this.user).subscribe((resp:Usuario)=>{
        this.user = resp
      })
      window.alert("Formulário preenchido com sucesso")
      window.location.reload()
    }
  }

  mostraTodos(){
    this.usuarioService.buscarTodos().subscribe((resp: Usuario[])=>{
      this.listaUsuario = resp
    })
  }

  mostraUm(){
    this.usuarioService.buscarUm(this.user.id).subscribe((resp: Usuario)=>{
      this.user = resp;
    })
  }


}
