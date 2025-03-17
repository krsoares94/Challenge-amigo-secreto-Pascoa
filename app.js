let amigos = [];

function adicionarAmigo() {
  const inputNome = document.getElementById('amigo');
  const nomes = inputNome.value.trim(); // Remove espaços extras

  // Se o campo estiver vazio, exibe um alerta e sai da função
  if (nomes === "") {
    alert(" Insira pelo menos um nome!");
    return;
  }

  // Separa os nomes por vírgula e remove espaços
  const nomesArray = nomes.split(",").map(nome => nome.trim()).filter(nome => nome !== "");

  // Se a lista ainda estiver vazia, mostra um alerta
  if (nomesArray.length === 0) {
    alert("Insira pelo menos um nome válido!");
    return;
  }

  // Adiciona os nomes ao array e atualiza a lista na tela
  amigos.push(...nomesArray);
  atualizarLista();
  inputNome.value = ""; // Limpa o campo
}

// Atualiza a lista de nomes na tela
function atualizarLista() {
  const listaAmigos = document.getElementById('listaAmigos');
  listaAmigos.innerHTML = '';

  // Cria um item na lista para cada nome
  amigos.forEach((nome, index) => {
    // Cria o elemento <li> que conterá o nome e o botão com ícone
    const item = document.createElement('li');
    
    // Cria um elemento para exibir o nome
    const nameSpan = document.createElement('span');
    nameSpan.textContent = nome;

    // Botão para remover nome da lista
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.addEventListener('click', () => {
      removerAmigo(index);

    });

    // Ícone do botão de remover coelho
    const iconImg = document.createElement('img');
    iconImg.src = 'assets/Remover-Coelho.png';
    iconImg.alt = 'Remover Amigo';
    iconImg.className = 'icon-remove';

    // add Ícone no  botão de remover coelho
    removeButton.appendChild(iconImg);

    // Adiciona o nome e o botão ao item da lista
    item.appendChild(nameSpan);
    item.appendChild(removeButton);

    // Adiciona o item na lista de amigos
    listaAmigos.appendChild(item);
  });
}

// Remove um nome da lista
function removerAmigo(index) {
  amigos.splice(index, 1);
  atualizarLista();
}

// Embaralha os itens de um array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Realiza o sorteio com mensagem extra
function sorterAmigo() {
  if (amigos.length < 2) {
    alert(' Adicione pelo menos 2 amigos!');
    return;
  }

  let sorteados = shuffle([...amigos]);

  // Garante que ninguém tire a si mesmo
  for (let i = 0; i < amigos.length; i++) {
    if (amigos[i] === sorteados[i]) {
      if (i === amigos.length - 1) {
        [sorteados[i], sorteados[i - 1]] = [sorteados[i - 1], sorteados[i]];
      } else {
        [sorteados[i], sorteados[i + 1]] = [sorteados[i + 1], sorteados[i]];
      }
    }
  }

  let resultados = [];
  for (let i = 0; i < amigos.length; i++) {
    resultados.push({ sorteador: amigos[i], sorteado: sorteados[i] });
  }

  exibirResultado(resultados);
}



// Mostra o resultado na tela
function exibirResultado(resultados) {
  const resultadoLista = document.getElementById('resultado');
  resultadoLista.innerHTML = '';

  const header = document.createElement('li');
  header.textContent = ' Confira o sorteio!';
  header.style.fontWeight = 'bold';
  resultadoLista.appendChild(header);

  resultados.forEach(resultado => {
    const item = document.createElement('li');
    item.textContent = `${resultado.sorteador}  → ${resultado.sorteado}`;
    resultadoLista.appendChild(item);
  });
}

// Sorteia apenas um coelho
function sortearUmAmigo() {
  if (amigos.length < 1) {
    alert("🐣 Adicione pelo menos um Amigo!");
    return;
  }
  const index = Math.floor(Math.random() * amigos.length);
  const sorteado = amigos[index];

  const resultadoLista = document.getElementById('resultado');
  resultadoLista.innerHTML = '';
  const item = document.createElement('li');
  item.textContent = `🎉 O coelho secreto é: ${sorteado}!`;
  item.style.fontWeight = 'bold';
  item.style.fontSize = '20px';
  resultadoLista.appendChild(item);
}

// Reinicia o sorteio
function reiniciarSorteio() {
  amigos = [];
  document.getElementById('amigo').value = "";
  document.getElementById('listaAmigos').innerHTML = "";
  document.getElementById('resultado').innerHTML = "";
  alert("🎊 Sorteio reiniciado!");
}




