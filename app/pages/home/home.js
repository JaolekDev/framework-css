// Função para adicionar uma tarefa
function adicionarTarefa() {
    var nomeTarefa = document.getElementById('nomeTarefa').value;

    if (!nomeTarefa) {
        alert('Por favor, preencha o nome da tarefa.');
        return;
    }

    // Recuperar tarefas existentes do localStorage
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Adicionar nova tarefa
    tarefas.push({ nome: nomeTarefa, passos: [] });

    // Salvar as tarefas atualizadas no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    document.getElementById('nomeTarefa').value = '';

    // Atualizar a visualização
    visualizarTarefas();
}

// Função para adicionar um passo a uma tarefa
function adicionarPasso(tarefaIndex) {
    var inputPasso = document.querySelector('#detalhesTarefa input[type="text"]');
    var conteudoPasso = inputPasso.value;

    if (!conteudoPasso) {
        alert('Por favor, preencha o conteúdo do passo.');
        return;
    }

    // Recuperar tarefas existentes do localStorage
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Adicionar novo passo à tarefa
    tarefas[tarefaIndex].passos.push({ conteudo: conteudoPasso, concluido: false });

    // Salvar as tarefas atualizadas no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    inputPasso.value = '';

    // Atualizar a visualização
    mostrarDetalhesTarefa(tarefaIndex);
}

// Função para visualizar todas as tarefas
function visualizarTarefas() {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    var tarefasDiv = document.getElementById('tarefas');
    tarefasDiv.innerHTML = '';  // Limpar visualização anterior

    tarefas.forEach(function(tarefa, tarefaIndex) {
        // Clonar o template da tarefa
        var template = document.getElementById('tarefa-template').content.cloneNode(true);
        var tarefaElement = template.querySelector('.tarefa');
        var h4Element = tarefaElement.querySelector('p');

        // Definir o nome da tarefa
        h4Element.textContent = tarefa.nome;
        h4Element.setAttribute('onclick', `mostrarDetalhesTarefa(${tarefaIndex})`);

        // Adicionar a tarefa ao container de tarefas
        tarefasDiv.appendChild(template);
    });

    if (tarefas.length === 0) {
        tarefasDiv.innerHTML = 'Nenhuma tarefa encontrada.';
    }
}

// Função para riscar um passo como concluído
function riscarPasso(tarefaIndex, indexPasso) {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    var tarefa = tarefas[tarefaIndex];
    if (tarefa) {
        tarefa.passos[indexPasso].concluido = !tarefa.passos[indexPasso].concluido;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
}

// Função para mostrar detalhes da tarefa
function mostrarDetalhesTarefa(tarefaIndex) {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    var tarefa = tarefas[tarefaIndex];
    var detalhesTarefaDiv = document.getElementById('detalhesTarefa');
    var nomeTarefaDetalhe = document.getElementById('nomeTarefaDetalhe');
    var passosDiv = document.getElementById('passos');

    // Atualizar o título da tarefa
    nomeTarefaDetalhe.textContent = tarefa.nome;

    // Atualizar a lista de passos
    passosDiv.innerHTML = ''; // Limpar visualização anterior
    var ulElement = document.createElement('ul');

    tarefa.passos.forEach(function(passo, index) {
        var liElement = document.createElement('p');
        liElement.innerHTML = `
            <input type="checkbox" onclick="riscarPasso(${tarefaIndex}, ${index})" ${passo.concluido ? 'checked' : ''}> ${passo.conteudo}
        `;
        ulElement.appendChild(liElement);
    });

    passosDiv.appendChild(ulElement);

    // Adicionar o input para novos passos
    var inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.placeholder = 'Novo passo';
    inputElement.setAttribute('onkeypress', `handleKeyPress(event, ${tarefaIndex})`);
    passosDiv.appendChild(inputElement);

    // Mostrar a div de detalhes
    detalhesTarefaDiv.style.display = 'block';
}

// Função para adicionar um passo ao pressionar Enter
function handleKeyPress(event, tarefaIndex) {
    if (event.key === 'Enter') {
        adicionarPasso(tarefaIndex);
    }
}

// Carregar e exibir tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', visualizarTarefas);
