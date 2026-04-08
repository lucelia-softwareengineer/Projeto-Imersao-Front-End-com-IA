# 🍿 Netflix - Imersão Front-End com IA

Bem-vindo ao **Netflix**! Sabe aquela tela clássica de "Quem está assistindo?" que te impede de ver o histórico de séries do seu irmão ou da sua tia? Pois é, eu recriei essa experiência usando o puro suco da web (**Vanilla JS**).

Este projeto é uma aplicação front-end que foca na seleção de perfis, com troca de temas dinâmica e uma navegação inteligente que "lembra" quem você é.

---

## 🚀 Como a mágica acontece?

A aplicação não é apenas um rostinho bonito. Por trás dos pixels, temos algumas funcionalidades bem interessantes:

* **Identidade de Perfil:** Quando você clica em um perfil, a aplicação captura o nome e a imagem e os envia para a página de catálogo.
* **Memória Curta (e Longa):** Usamos o `localStorage` para salvar sua preferência de tema e qual perfil foi o último a logar. Se você atualizar a página, nada se perde!
* **Modo Drácula ou Modo Verão:** Temos um alternador de tema (**Dark/Light mode**) que respeita as configurações do seu sistema operacional, mas te dá total liberdade para mudar.
* **URLs Inteligentes:** Além do armazenamento local, passamos os dados via `Query Params`, garantindo que o catálogo receba as informações corretamente.

---

## 🛠️ Tecnologias de Elite

Para construir esse mini-império do streaming, usei:

* **HTML5:** Estrutura semântica e acessível (leitores de tela agradecem!).
* **CSS3:** Variáveis customizadas para a troca de temas e layout responsivo.
* **JavaScript (ES6+):** Lógica pura, sem frameworks pesados. Destaque para o uso de `matchMedia` e `URLSearchParams`.

---

## 🧠 O que eu aprendi nessa jornada

1.  **Acessibilidade importa:** Usar `aria-labels` e tags semânticas não é só "bonitinho", é essencial para uma web inclusiva.
2.  **Manipulação de URL:** Aprender a normalizar caminhos de imagem e tratar parâmetros de busca é um divisor de águas.
3.  **Persistência de dados:** O navegador é um aliado poderoso quando você sabe usar o armazenamento interno de forma estratégica.

---

## 🎨 Como rodar na sua máquina

É mais fácil que escolher o que assistir no sábado à noite:

1.  Clone o repositório.
2.  Abra o arquivo `index.html` no seu navegador favorito.
3.  Escolha seu perfil e prepare a pipoca! 🥤🍿

---

### Quer contribuir?
Sinta-se à vontade para abrir um **Pull Request**, sugerir novas funcionalidades ou apenas dar uma estrela no projeto!

Feito com 💻 e muita cafeína.
