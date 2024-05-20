import { Routes } from '@angular/router';
import { CadastroTarefaComponent } from './components/cadastro-tarefa/cadastro-tarefa.component';
import { EdicaoTarefaComponent } from './components/edicao-tarefa/edicao-tarefa.component';
import { ConsultaTarefasComponent } from './components/consulta-tarefas/consulta-tarefas.component';

//mapeamento das rotas do projeto
//rotas são URLs
export const routes: Routes = [
    {
        //ROTA (URL)
        path: 'pages/cadastro-tarefas',
        component: CadastroTarefaComponent
    },
    {
        //ROTA (URL)
        path: 'pages/consulta-tarefas',
        component: ConsultaTarefasComponent
    },
    {
        //ROTA (URL)
        path: 'pages/edicao-tarefas/:id',
        component: EdicaoTarefaComponent
    },
    {
        //ROTA DEFAULT - RAIZ (URL)
        path: '', pathMatch: 'full',
        redirectTo: '/pages/consulta-tarefas'
    },


];
