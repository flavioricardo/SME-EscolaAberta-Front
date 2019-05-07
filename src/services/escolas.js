import { URL_API } from './base';

export async function listarEscolas(nomesc = '', tipoesc = '', dre = '', pagina = 1) {
    var filtros = '';
    filtros += 'search=' + nomesc;
    filtros += '&tipoesc=' + tipoesc;
    filtros += '&dre=' + dre;
    filtros += '&page=' + pagina;

    return fetch(`${URL_API}/escolas/?${filtros}`).then(
        escolas => escolas.json()
    )
}

export async function listarBairros(bairro = '') {
    return fetch(`${URL_API}/bairros/?search=${bairro}`).then(
        bairros => bairros.json()
    )
}

export async function listarDistritos(distrito = '') {
    return fetch(`${URL_API}/distritos/?search=${distrito}`).then(
        distritos => distritos.json()
    )
}

export async function listarTiposEscola() {
    return fetch(`${URL_API}/tipo_escola/`).then(
        tipos => tipos.json()
    )
}

export async function listarDREs() {
    return fetch(`${URL_API}/diretorias/`).then(
        dres => dres.json()
    )
}