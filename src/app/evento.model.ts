/**
 * Classe Noticia.
 */
export class Evento {
    /**
     * O identificador da notícia
     */
    id: number;

    /**
     * O título da notícia
     */
    sigla: string;

    /**
     * O conteúdo da notícia
     */
    nome: string;

    dataInicio: Date;
    dataTermino: Date;
    prazo: Date;

    url: string;

    /**
     * Construtor da classe. O código trata o valor do parâmetro `data` da seguinte forma:
     * 
     * a) se estiver definido, então:
     *   * se for do tipo string, então usa o construtor de `Date` para criar um objeto `Date`
     *   * senão, atribui diretamente
     * 
     * b) senão, atribui null
     *
     * @param id O identificador da notícia
     * @param titulo O título da notícia
     * @param conteudo O conteúdo da notícia
     * @param autor O nome do autor da notícia
     * @param emailDoAutor O e-mail do autor da notícia
     * @param data A data da publicação da notícia
     */
    constructor(id: number, sigla: string, nome: string, dataInicio: Date, dataTermino: Date, prazo: Date, url: string) {
        this.id = id;
        this.sigla = sigla;
        this.nome = nome;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
        this.prazo = prazo;
        if (dataInicio) {
            if (typeof dataInicio === 'string') {
                this.dataInicio = new Date(dataInicio);
            } else {
                this.dataInicio = dataInicio;
            }
        } else {
            this.dataInicio = null;
        }
        if (dataTermino) {
            if (typeof dataTermino === 'string') {
                this.dataTermino = new Date(dataTermino);
            } else {
                this.dataTermino = dataTermino;
            }
        } else {
            this.dataTermino = null;
        }

        if (prazo) {
            if (typeof prazo === 'string') {
                this.prazo = new Date(prazo);
            } else {
                this.prazo = prazo;
            }
        } else {
            this.prazo = null;
        }                
    }

}
