import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import SelectCustomizado from '../Inputs/SelectCustomizado';
import SelectAutocomplete from '../Inputs/SelectAutocomplete';
import { listarTiposEscola, listarDREs, listarEscolas } from '../../services/escolas';

export default class Filtros extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolas : [],
            tiposEscola : [],
            dres : [],
            escola : '',
            tipoEscola : '',
            dre : ''
        }

        this.filtraListagemEscolas = this.filtrarListagemEscolas.bind(this);
        this.setEscola = this.setEscola.bind(this);
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

    componentWillMount() {
        listarEscolas().then(
            lista => {
                let escolas = [];
                lista.results.forEach(function(escola) {
                    escolas.push({value : escola.codesc, label : escola.nomesc })
                });
                this.setState({ escolas : escolas });
            }
        )
    }

    componentDidUpdate() {
        this.filtrarListagemEscolas();
    }

    filtrarListagemEscolas() {
        listarEscolas(this.state.escola, this.state.tipoEscola, this.state.dre).then(
            lista => {
                PubSub.publish('lista-escolas', lista.results);
                PubSub.publish('total-itens', lista.count);
            }
        )
    }

    buscarEscolas = (e) => {
        if (e.target.value.length >= 3) {
            let escolas = [];
            listarEscolas(e.target.value).then(
                lista => {
                    lista.results.forEach(function(escola) {
                        escolas.push({value : escola.codesc, label : escola.nomesc });
                    });
                    this.setState({ escolas :  escolas });
                }
            )
        }
    }

    setEscola(collection, e) {
        var filter = {};

        Object.entries(collection).map(([key, item]) => {
            if (item.label.includes(e))
                filter[key] = item;
            return filter;
        });

        collection = filter;

        this.setState({
            escola: e,
            escolas: collection
        });
        PubSub.publish('escola-filtro', e);
    }

    setTipoEscola(event) {
        this.setState({ tipoEscola : event.target.value });
        PubSub.publish('tipo-escola-filtro', event.target.value);
    }

    setDRE(event) {
        this.setState({ dre : event.target.value });
        PubSub.publish('dre-filtro', event.target.value);
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h2>Escola Aberta</h2>
                        </div>
                        <div className="col-6"></div>
                    </div>
                </div>
                <div className="menu-busca p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-xs-12">
                                <SelectAutocomplete
                                    value={this.state.escola}
                                    collection={this.state.escolas}
                                    className="custom-select rounded-pill"
                                    placeholder="Selecione a escola"
                                    onChange={this.setEscola}
                                    onKeyDown={this.buscarEscolas}
                                />
                            </div>
                            <div className="col-lg-2 col-xs-12">
                                <SelectCustomizado
                                    name="filtro-tipo"
                                    id="filtro-tipo"
                                    className="custom-select rounded-pill"
                                    emptyLabel="Selecione o tipo"
                                    lista={this.state.tiposEscola}
                                    value="tipoesc"
                                    label="tipoesc"
                                    onChange={this.setTipoEscola}
                                />
                            </div>
                            <div className="col-lg-5 col-xs-12">
                                <SelectCustomizado
                                    name="filtro-dre"
                                    id="filtro-dre"
                                    className="custom-select rounded-pill"
                                    emptyLabel="Selecione a DRE"
                                    lista={this.state.dres}
                                    value="dre"
                                    label="diretoria"
                                    onChange={this.setDRE}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}