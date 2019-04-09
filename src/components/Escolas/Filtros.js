import React, { Component } from 'react';
import { listarTiposEscola, listarDREs, listarEscolas } from '../../services/escolas';
import PubSub from 'pubsub-js';

class Filtros extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tiposEscola : [],
            dres : [],
            tipoEscola : '',
            dre : ''
        }

        this.filtraListagemEscolas = this.filtraListagemEscolas.bind(this);
        this.setTipoEscola = this.setTipoEscola.bind(this);
        this.setDRE = this.setDRE.bind(this);
    }

    componentDidMount() {
        listarTiposEscola().then(
            lista => this.setState({ tiposEscola : lista.results })
        )

        listarDREs().then(
            lista => this.setState({ dres : lista.results })
        )
    }

    filtraListagemEscolas() {
        listarEscolas(this.state.tipoEscola, this.state.dre).then(
            lista => PubSub.publish('lista-escolas', lista.results)
        )
    }

    componentDidUpdate() {
        this.filtraListagemEscolas();
    }

    setTipoEscola(event) {
        this.setState({ tipoEscola : event.target.value });
    }

    setDRE(event) {
        this.setState({ dre : event.target.value });
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h1>Escola Aberta</h1>
                        </div>
                        <div className="col-6">
                            <h2>Consulte sua posição</h2>
                        </div>
                    </div>
                </div>
                <div className="menu-busca p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-5">
                                <select name="filtro-escola" id="filtro-escola" className="custom-select rounded-pill">
                                    <option value="">Selecione a escola</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <select name="filtro-tipo" id="filtro-tipo" className="custom-select rounded-pill" onChange={ this.setTipoEscola }>
                                    <option value="">Selecione o tipo</option>
                                    {
                                        this.state.tiposEscola.map(function(tipo, indice) {
                                            return <option key={ indice } value={ tipo.tipoesc }>{ tipo.tipoesc }</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-5">
                                <select name="filtro-dre" id="filtro-dre" className="custom-select rounded-pill" onChange={ this.setDRE }>
                                    <option value="">Selecione a DRE</option>
                                    {
                                        this.state.dres.map(function(dre, indice) {
                                            return <option key={ indice } value={ dre.dre }>{ dre.diretoria }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Filtros;