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

});

// Envio de formulário de contato
document.getElementById("form-contato").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const statusMensagem = document.getElementById("status-mensagem");

    fetch("https://formsubmit.co/ariellorenz24@gmail.com", {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                statusMensagem.textContent = "Mensagem enviada com sucesso!";
                form.reset();
            } else {
                statusMensagem.textContent = "Erro ao enviar. Tente novamente.";
            }
        })
        .catch(() => {
            statusMensagem.textContent = "Erro ao conectar com o servidor.";
        });
});
