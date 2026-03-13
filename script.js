const servicosPetShop = [
    {
        id: 1,
        nome: "Banho e Tosa",
        descricao: "Estética completa, deixando seu pet limpinho, cheiroso e com a tosa ideal para a raça.",
        preco: "Consulte os valores",
        icone: "🚿"
    },
    {
        id: 2,
        nome: "Consultório Veterinário",
        descricao: "Atendimento clínico completo para cuidar da saúde, vacinas e bem-estar do seu melhor amigo.",
        preco: "Agende uma avaliação",
        icone: "🏥"
    },
    {
        id: 3,
        nome: "Entrega em Domicílio",
        descricao: "Comodidade para você! Entregamos produtos, rações e medicamentos diretamente na sua casa.",
        preco: "Entregamos",
        icone: "📦"
    }
];

const produtosPet = [
    {
        id: 1,
        nome: "Rações para Cães e Gatos",
        descricao: "Trabalhamos com as melhores marcas do mercado para garantir a nutrição ideal do seu pet.",
        preco: "Diversas opções",
        icone: "🐶🐱"
    },
    {
        id: 2,
        nome: "Farmácia Veterinária",
        descricao: "Medicamentos em geral, antipulgas, carrapaticidas, vermífugos e suplementos.",
        preco: "Farmácia Completa",
        icone: "💊"
    }
];

const numeroWhatsApp = "5521964168522";

function renderizarConteudo() {
    const containerServicos = document.getElementById('catalogo-container');
    const containerProdutos = document.getElementById('produtos-container');

    if (containerServicos) containerServicos.innerHTML = '';
    if (containerProdutos) containerProdutos.innerHTML = '';

    if (containerServicos) {
        servicosPetShop.forEach((servico, index) => {
            const mensagem = encodeURIComponent(`Olá! Gostaria de informações sobre o serviço de *${servico.nome}*.`);
            const linkWhats = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

            const card = document.createElement('div');
            card.classList.add('servico-card', 'fade-up', `delay-${index + 1}`);

            card.innerHTML = `
                <div class="servico-icone">${servico.icone}</div>
                <h3>${servico.nome}</h3>
                <p>${servico.descricao}</p>
                <span class="servico-preco">${servico.preco}</span>
                <a href="${linkWhats}" target="_blank" class="btn-whatsapp">Saiba Mais</a>
            `;
            containerServicos.appendChild(card);
        });
    }

    if (containerProdutos) {
        produtosPet.forEach((item, index) => {
            const mensagem = encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade/preço do item: *${item.nome}*.`);
            const linkWhats = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

            const card = document.createElement('div');
            card.classList.add('servico-card', 'fade-up', `delay-${index + 1}`);

            card.innerHTML = `
                <div class="servico-icone">${item.icone}</div>
                <h3>${item.nome}</h3>
                <p>${item.descricao}</p>
                <span class="servico-preco">${item.preco}</span>
                <a href="${linkWhats}" target="_blank" class="btn-whatsapp">Consultar</a>
            `;
            containerProdutos.appendChild(card);
        });
    }

    iniciarAnimacoes();
}

// =========================================
// LÓGICA DE ANIMAÇÕES E INTERAÇÕES
// =========================================

function iniciarAnimacoes() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    // 1. Navbar scroll effect + Back to Top visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide back to top button
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // 2. Back to Top click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. Intersection Observer for fade-up animations
    const elementosAnimados = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.12
    });

    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

    // 4. Mobile menu toggle with animation
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    });

    // 5. Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#a594f9';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', renderizarConteudo);
