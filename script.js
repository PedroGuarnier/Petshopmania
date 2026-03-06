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
        preco: "🏍 Entregamos",
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
    
    if(containerServicos) containerServicos.innerHTML = '';
    if(containerProdutos) containerProdutos.innerHTML = '';

    if(containerServicos) {
        servicosPetShop.forEach((servico, index) => {
            const mensagem = encodeURIComponent(`Olá! Gostaria de informações sobre o serviço de *${servico.nome}*.`);
            const linkWhats = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

            const card = document.createElement('div');
            // Adicionando as classes de animação dinâmica e um delay baseado na posição
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

    if(containerProdutos) {
        produtosPet.forEach((item, index) => {
            const mensagem = encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade/preço do item: *${item.nome}*.`);
            const linkWhats = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

            const card = document.createElement('div');
            // Adicionando as classes de animação dinâmica
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

    // Após renderizar os cards, inicia a observação das animações
    iniciarAnimacoes();
}

// =========================================
// LÓGICA DE ANIMAÇÕES E INTERAÇÕES
// =========================================

function iniciarAnimacoes() {
    // 1. Efeito do Navbar ao rolar a página
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer para o Fade-up das seções e cards
    const elementosAnimados = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Opcional: Descomente a linha abaixo se quiser que a animação ocorra apenas 1 vez
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível na tela
    });

    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
    // ... código do observer que já estava aí ...

    // 3. Lógica do Menu Mobile (Menu Hambúrguer)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Abre/fecha o menu ao clicar no ícone
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fecha o menu automaticamente quando clica em algum link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', renderizarConteudo);