import { Component, OnInit } from '@angular/core';
import { Evento } from './evento.model';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tela = 'home';

  /**
   * Atributo que representa a lista de notícias (memória)
   */
  eventos = [];

  /**
   * Atributo vinculado ao campo "título" no formulário
   */
  sigla = null;

  /**
   * Atributo vinculado ao campo "conteúdo" no formulário
   */
  nome = null;


  /**
   * Atributo vinculado ao campo "autor" no formulário
   */
  dataInicio = null;

  /**
   * Atributo vinculado ao campo "emailDoAutor" no formulário
   */
  dataTermino = null;

  /**
   * Atributo vinculado ao campo "data" no formulário
   */
  prazo = null;

  url = null;

  /**
   * Atributo utilizado para controlar a notícia visível na tela de leitura
   */

  /**
   * Atributo utilizado para controlar quando há uma notícia sendo editada
   */
  editarEvento = null;

  listaPesquisa = null;

  /**
   * Atributo utilizado para controlar a pesquisa da lista de notícias
   */

  /**
   * Implementação da interface {@link OnInit}. Define dados de exemplo
   */
  ngOnInit() {
    this.eventos.push(new Evento(
      this.eventos.length,
      'ABC',
      'Associaçao BC',
      new Date(),
      new Date(),
      new Date(),
      'http://www.google.com',



    ));
  }
  /**
   *
   */
  salvar(form) {
    if (!this.editarEvento) {
      const evento = new Evento(
        this.eventos.length,
        this.sigla,
        this.nome,
        this.dataInicio,
        this.dataTermino,
        this.prazo,
        this.url
      );
      localStorage.setItem( "sigla", evento.sigla );
      localStorage.setItem( "nome", evento.nome );


      this.eventos.push(evento);
    } else {
      const evento = this.eventos.find(n => n.id === this.editarEvento.id);
      evento.sigla = this.sigla;
      evento.nome = this.nome;
      evento.url = this.url;
      if (this.dataInicio) {
        evento.dataInicio = new Date(this.dataInicio);
      } else {
        this.dataInicio = null;
      }
      if (this.dataTermino) {
        evento.dataTermino = new Date(this.dataTermino);
      } else {
        this.dataTermino = null;
      }
      if (this.prazo) {
        evento.prazo = new Date(this.prazo);
      } else {
        this.prazo = null;
      }
      this.editarEvento = null;
    }
    form.reset();
    this.irPara('lista');

  }

   irPara(nome) {
    this.tela = nome;
    if (nome === 'cadastro') {
      this.editarEvento = null;
      this.sigla = null;
      this.nome = null;
      this.dataInicio = null;
      this.dataTermino = null;
      this.prazo = null;
      this.url = null;

    }
  }
  eventosParaLista() {
    if (this.listaPesquisa) {
      return this.eventos.filter(n =>
        n.sigla.indexOf(this.listaPesquisa) !== -1
        || n.nome.indexOf(this.listaPesquisa) !== -1
      );
    } else {
      return this.eventos;
    }
  }

  /**
   * Converte um objeto {@link Date} para o formato de string usado no campo do
   * formulário (datetime-local), adotando o formato: YYYY-MM-DDThh:mm, sendo:
   * **YYYY** o ano com quatro dígitos (resultado do método `getFullYear()`),
   * **MM** o mês com dois dígitos (resultado do método `getMonth()`, notar a necessidade
   * de somar 1),
   * **DD** o dia do mês com dois dígitos (resultado do método `getDate()`),
   * **hh** as horas com dois dígitos (resultado do método `getHours()`) e
   * **mm** os minuots com dois dígitos (resultado do método `getMinutes()`)
   * @param d O objeto Date para ser convertido em string
   */
  date2str(d) {
    if (d) {
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 });
      const day = d.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 });
      const hours = d.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
      const minutes = d.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } else {
      return '';
    }
  }

  /**
   * Abre a tela de cadastro com o formulário preenchido com os dados da notícia que deve ser editada
   * @param noticia A notícia para ser editada
   */
  editar(evento) {
  		this.editarEvento = evento;
        this.sigla = evento.sigla;
        this.nome = evento.nome;
        this.url = evento.url;
    	this.dataInicio = this.date2str(evento.dataInicio);
    	this.dataTermino = this.date2str(evento.dataTermino);
    	this.prazo = this.date2str(evento.prazo);
    	this.irPara('edicao');
  }



  /**
   * Exclui uma notícia, após confirmação
   * @param noticia A notícia para ser excluída
   */
  excluir(evento) {
    if (confirm(`Tem certeza que deseja excluir o evento: ${evento.sigla} ?`)) {
      this.eventos.splice(this.eventos.findIndex(n => n.id === evento.id), 1);
    }
  }

  /**
   * Cancela a edição de uma notícia e torna visível a tela da lista
   */
  cancelarEdicao() {
    this.editarEvento = null;
    this.irPara('lista');
  }

}
