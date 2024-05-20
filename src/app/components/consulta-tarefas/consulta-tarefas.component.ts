import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consulta-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './consulta-tarefas.component.html',
  styleUrl: './consulta-tarefas.component.css'
})
export class ConsultaTarefasComponent {

   //variáveis
   tarefas: any[] = []; //array de objetos
   mensagemConsulta: string = '';//exibir mensgaem na consulta de tarefas
   mensagemExclusao: string = '';
    //método construtor (injeção de dependência)
    constructor(
      private httpClient: HttpClient
    ) {}


    //criando um objeto formulário
    formulario = new FormGroup({
      dataMin : new FormControl('', [Validators.required]),
      dataMax : new FormControl('', [Validators.required])
    });


    //função para verificar o estado de cada campo
    get f() {
      return this.formulario.controls;
    }


    //função para capturar o SUBMIT do formulário
    consultarTarefas() : void {

      const dataMin = this.formulario.value.dataMin;
      const dataMax = this.formulario.value.dataMax;


      this.httpClient
        .get(environment.apiTarefas + "/" + dataMin + "/" + dataMax)
        .subscribe({
          next: (data) => {
            this.tarefas = data as any[];

            //verificar se alguma tarefa foi encontrada

            if(this.tarefas != null && this.tarefas.length > 0) {
              this.mensagemConsulta = 'Quantidade de tarefas obtidas: '+ this.tarefas.length;

            }else{
              this.mensagemConsulta = 'Nenhuma tarefa foi encontrada para o período selecionado';
            }

          },
          error: (e) => {
            console.log(e.error);
          }
        })
    }

    excluirTarefa(id: string): void{
      
      if(confirm('Deseja excluir a tarefa selecionada?')){

        //enviando uma requisição para o endpoint de exclusão de tarefa
        this.httpClient.delete(environment.apiTarefas + '/' + id)
          .subscribe({
            next: (data: any) =>{ //resposta de sucesso da api
              this.mensagemExclusao = 'Tarefa excluída com sucesso' + data.id;
              this.consultarTarefas();
            },
            error: (e) => { //resposta de erro da api
              console.log(e.error);
            }
          });

      }
    }
}
