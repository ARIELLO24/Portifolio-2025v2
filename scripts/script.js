document.addEventListener('DOMContentLoaded', function () {
    // Atualizar ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Menu mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const navList = document.querySelector('header nav ul');

    menuBtn.addEventListener('click', function () {
        navList.classList.toggle('show');
    });

    // Suavizar rolagem para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Fechar menu mobile se estiver aberto
                if (navList.classList.contains('show')) {
                    navList.classList.remove('show');
                }
            }
        });
    });

    // Carregar projetos via API
    async function loadProjects() {
        try {
            // Simulação de chamada à API
            // Na prática, você pode usar uma API real como GitHub API
            const response = await fetch('https://api.npoint.io/d6bd0efc05639084eb17'); // API de exemplo
            const data = await response.json();

            const projectsContainer = document.getElementById('projects-container');

            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-links">
                            <a href="${project.demo}" target="_blank">Demo</a>
                            <a href="${project.code}" target="_blank">Código</a>
                        </div>
                    </div>
                `;

                projectsContainer.appendChild(projectCard);
            });
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);

            // Fallback caso a API falhe
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <img src="assets/images/project1.jpg" alt="Projeto 1">
                    </div>
                    <div class="project-info">
                        <h3>Portfólio Pessoal</h3>
                        <p>Site de portfólio responsivo desenvolvido com HTML, CSS e JavaScript.</p>
                        <div class="project-links">
                            <a href="#" target="_blank">Demo</a>
                            <a href="#" target="_blank">Código</a>
                        </div>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">
                        <img src="assets/images/project2.jpg" alt="Projeto 2">
                    </div>
                    <div class="project-info">
                        <h3>Sistema de To-Do</h3>
                        <p>Aplicativo de lista de tarefas com funcionalidades CRUD.</p>
                        <div class="project-links">
                            <a href="#" target="_blank">Demo</a>
                            <a href="#" target="_blank">Código</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    loadProjects();

    // Validação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Validar nome
        const nome = document.getElementById('nome');
        const nomeError = nome.nextElementSibling;

        if (nome.value.trim() === '') {
            nomeError.textContent = 'Por favor, insira seu nome.';
            nomeError.style.display = 'block';
            isValid = false;
        } else {
            nomeError.style.display = 'none';
        }

        // Validar email
        const email = document.getElementById('email');
        const emailError = email.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === '') {
            emailError.textContent = 'Por favor, insira seu email.';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Por favor, insira um email válido.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Validar mensagem
        const mensagem = document.getElementById('mensagem');
        const mensagemError = mensagem.nextElementSibling;

        if (mensagem.value.trim() === '') {
            mensagemError.textContent = 'Por favor, insira sua mensagem.';
            mensagemError.style.display = 'block';
            isValid = false;
        } else {
            mensagemError.style.display = 'none';
        }

        // Se tudo estiver válido, simular envio
        if (isValid) {
            // Aqui você pode adicionar o código para enviar o formulário
            // Por exemplo, usando fetch para enviar para um backend

            // Simulando envio com setTimeout
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');

                // Resetar após 5 segundos
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                    contactForm.classList.remove('hidden');
                }, 5000);
            }, 1000);
        }
    });

    // Adicionar classe ao scroll para efeitos
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');

        if (window.scrollY > 50) {
            header.style.background = 'rgba(44, 62, 80, 0.9)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.background = 'var(--secondary-color)';
            header.style.padding = '1rem 0';
        }
    });
});