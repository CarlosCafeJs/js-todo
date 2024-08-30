// Seletores
const searchItem = document.querySelector('#search-js-todo');
const priorityItem = document.querySelector('#prioridades-js-todo');
const todosItem = document.querySelector('#todos-js-todo');
const inputItem = document.querySelector('#enter-todos');
const btnItem = document.querySelector('#btn-adicionar');

// Funções de Manipulação do DOM
function criarLi() {
  return document.createElement('li');
}

function criaBotao(li) {
  const criaBtn = document.createElement('button');
  criaBtn.innerText = 'Apagar';
  criaBtn.classList.add('apagar');
  li.appendChild(criaBtn);
}

function criaParagrafo(li, texto) {
  const criaPgf = document.createElement('p');
  criaPgf.innerText = texto;
  li.appendChild(criaPgf);
}

function criaTarefa(texto) {
  const li = criarLi();
  criaParagrafo(li, texto);
  criaBotao(li);
  todosItem.appendChild(li);
  salvarTarefa();
}

function salvarTarefa() {
  const liTarefas = todosItem.querySelectorAll('li');
  const listaTarefas = Array.from(liTarefas).map(tarefa =>
    tarefa.querySelector('p').innerText
  );
  localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
}

function recuperaTarefa() {
  const tarefas = localStorage.getItem('tarefas');
  if (tarefas) {
    const tarefasRecuperadas = JSON.parse(tarefas);
    tarefasRecuperadas.forEach(tarefa => criaTarefa(tarefa));
  }
}

function limpaTarefa() {
  inputItem.value = '';
  inputItem.focus();
}

// Eventos
btnItem.addEventListener('click', () => {
  if (inputItem.value.trim()) {
    criaTarefa(inputItem.value.trim());
    limpaTarefa();
  }
});

inputItem.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputItem.value.trim()) {
    criaTarefa(inputItem.value.trim());
    limpaTarefa();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('apagar')) {
    e.target.parentElement.remove();
    salvarTarefa();
  }
});

// Recupera as tarefas ao carregar a página
recuperaTarefa();
