const searchItem = document.querySelector('#search-js-todo');
const priorityItem = document.querySelector('#prioridades-js-todo');
const todosItem = document.querySelector('#todos-js-todo');
const inputItem = document.querySelector('#enter-todos');
const listItem = document.querySelector('#todos-js-todo');
const btnItem = document.querySelector('#btn-adicionar');

// function limparMensagem() {
//   priorityItem.innerHTML = '';
// }

// ========== FUNCTION's


// == Functions Criar e salvar
function criarLi() {
  const li = document.createElement('li');
  return li;
}

function criaBotao(li) {
  li.innerText += ' ';
  const criaBtn = document.createElement('button');
  criaBtn.innerText = 'Apagar';
  criaBtn.setAttribute('class', 'apagar')
  li.appendChild(criaBtn);
}

function criaTrefa(texto) {
  const li = criarLi();
  li.innerText = texto;
  listItem.appendChild(li);
  criaBotao(li);

}

function salvarTarefa() {
  const liTarefas = listItem.querySelectorAll('li');
  const listaTarefas = [];
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText.replace("Apagar Tarefa", "").trim();

    listaTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaTarefas)
  localStorage.setItem('tarefas', tarefasJSON)
}

function recuperaTarefa() {
  const tarefas = localStorage.getItem('tarefas');
  const tarefasRecuperadas = JSON.parse(tarefas);
  for (let tarefa of tarefasRecuperadas) {
    criaTrefa(tarefa);
  }
}

// == Functions Limpar ou Apagar
function limpaTarefa() {
  inputItem.value = '';
  inputItem.focus();
};



// ========== EVENT's

btnItem.addEventListener('click', function (e) {
  if (!inputItem.value) return;
  criaTrefa(inputItem.value);
  limpaTarefa();
  salvarTarefa()
});


inputItem.addEventListener('keypress', (e) => {
  if (!inputItem.value) return;

  if (e.keyCode === 13) {
    criaTrefa(inputItem.value);
    limpaTarefa();
    salvarTarefa()
  };
});

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefa()
  }
});

// ==== Para carregamento:
recuperaTarefa()