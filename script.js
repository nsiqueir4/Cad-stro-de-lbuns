class Album {
    constructor(titulo, artista, ano, genero, nota) {
        this.titulo = titulo;
        this.artista = artista;
        this.ano = ano;
        this.genero = genero;
        this.nota = nota;
    }
}

class AlbumCadastro {
    constructor() {
        this.albuns = [];
        this.editandoIndice = null;
    }

    adicionarAlbum(album) {
        this.albuns.push(album);
        this.atualizarTabela();
        limparForm();
    }

    atualizarAlbum(album) {
        if (this.editandoIndice !== null) {
            this.albuns[this.editandoIndice] = album;
            this.editandoIndice = null;
            this.atualizarTabela();
            limparForm();
        }
    }

    atualizarTabela() {
        const tabela = document.getElementById("tabelaAlbuns");
        tabela.innerHTML = "";

        this.albuns.forEach((album, i) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${album.titulo}</td>
                <td>${album.artista}</td>
                <td>${album.ano}</td>
                <td>${album.genero}</td>
                <td>${album.nota}</td>
                <td>
                    <button onclick="albumCadastro.editarAlbum(${i})" class="btn btn-primary btn-sm">Editar</button>
                    <button onclick="albumCadastro.removerAlbum(${i})" class="btn btn-danger btn-sm">Excluir</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    }

    removerAlbum(indice) {
        this.albuns.splice(indice, 1);
        this.atualizarTabela();
    }

    editarAlbum(indice) {
        const album = this.albuns[indice];

        document.getElementById("titulo").value = album.titulo;
        document.getElementById("artista").value = album.artista;
        document.getElementById("ano").value = album.ano;
        document.getElementById("genero").value = album.genero;
        document.getElementById("nota").value = album.nota;

        this.editandoIndice = indice;

        document.getElementById("btnAdicionar").style.display = "none";
        document.getElementById("btnAtualizar").style.display = "inline-block";
    }
}

const albumCadastro = new AlbumCadastro();

document.getElementById("albumForm").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const artista = document.getElementById("artista").value;
    const ano = document.getElementById("ano").value;
    const genero = document.getElementById("genero").value;
    const nota = document.getElementById("nota").value;

    const album = new Album(titulo, artista, ano, genero, nota);
    albumCadastro.adicionarAlbum(album);
});

document.getElementById("btnAtualizar").addEventListener("click", function () {
    const titulo = document.getElementById("titulo").value;
    const artista = document.getElementById("artista").value;
    const ano = document.getElementById("ano").value;
    const genero = document.getElementById("genero").value;
    const nota = document.getElementById("nota").value;

    const album = new Album(titulo, artista, ano, genero, nota);
    albumCadastro.atualizarAlbum(album);
});

function limparForm() {
    document.getElementById("albumForm").reset();
    albumCadastro.editandoIndice = null;
    document.getElementById("btnAdicionar").style.display = "inline-block";
    document.getElementById("btnAtualizar").style.display = "none";
}
