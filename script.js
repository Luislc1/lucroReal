// Tabelas reais com base nas imagens fornecidas
const tabelaInvestimento = {
  34000: 197.20, 37500: 217.51, 40000: 232.00, 42500: 246.51, 45000: 261.00,
  50000: 290.00, 60000: 348.00, 70000: 406.00, 80000: 464.00, 90000: 522.00,
  100000: 483.30, 120000: 579.96, 130000: 628.29, 140000: 676.62, 150000: 724.95,
  160000: 773.28, 170000: 821.61, 180000: 869.94, 200000: 966.60, 220000: 1063.26,
  250000: 1208.25, 280000: 1353.24, 300000: 1449.90, 400000: 1657.20, 500000: 2071.50,
  600000: 2485.80, 700000: 2900.10, 800000: 3314.40
};
const tabelaImoveis = {
  80000: 273.20, 90000: 307.35, 100000: 341.50, 120000: 409.80, 140000: 478.10,
  150000: 512.25, 180000: 614.70, 200000: 615.00, 250000: 768.75, 300000: 922.50,
  350000: 1076.25, 400000: 1230.00, 500000: 1397.50, 600000: 1677.00, 700000: 1953.50,
  800000: 2236.00, 900000: 2515.00, 1000000: 2795.00
};

function getNearestValue(tabela, valor) {
  let keys = Object.keys(tabela).map(Number).sort((a,b)=>a-b);
  let closest = keys.reduce((prev, curr) => Math.abs(curr - valor) < Math.abs(prev - valor) ? curr : prev);
  return { credito: closest, parcela: tabela[closest] };
}

// Elementos
const rangeInv = document.getElementById('rangeInvestimento');
const valorInvSpan = document.getElementById('valorInvestimento');
const parcelaInvSpan = document.getElementById('parcelaInvestimento');
const rangeImv = document.getElementById('rangeImoveis');
const valorImvSpan = document.getElementById('valorImovel');
const parcelaImvSpan = document.getElementById('parcelaImovel');

function atualizarInvestimento() {
  let valor = Number(rangeInv.value);
  let { credito, parcela } = getNearestValue(tabelaInvestimento, valor);
  rangeInv.value = credito;
  valorInvSpan.innerText = `R$ ${credito.toLocaleString('pt-BR')}`;
  parcelaInvSpan.innerText = `R$ ${parcela.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
}
function atualizarImoveis() {
  let valor = Number(rangeImv.value);
  let { credito, parcela } = getNearestValue(tabelaImoveis, valor);
  rangeImv.value = credito;
  valorImvSpan.innerText = `R$ ${credito.toLocaleString('pt-BR')}`;
  parcelaImvSpan.innerText = `R$ ${parcela.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
}

rangeInv.addEventListener('input', atualizarInvestimento);
rangeImv.addEventListener('input', atualizarImoveis);
atualizarInvestimento();
atualizarImoveis();

// Abas
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    contents.forEach(c => c.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');
  });
});

// Envio WhatsApp simulação
document.getElementById('sendSimulationBtn').addEventListener('click', () => {
  const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
  let credito, parcela, plano;
  if (activeTab === 'investimento') {
    credito = Number(rangeInv.value);
    parcela = getNearestValue(tabelaInvestimento, credito).parcela;
    plano = 'Investimento / Veículos';
  } else {
    credito = Number(rangeImv.value);
    parcela = getNearestValue(tabelaImoveis, credito).parcela;
    plano = 'Imóveis / Terrenos';
  }
  const msg = `Olá! Gostaria de simular um consórcio:\n📌 Plano: ${plano}\n💰 Crédito: R$ ${credito.toLocaleString('pt-BR')}\n📆 Parcela aproximada: R$ ${parcela.toFixed(2).replace('.',',')}\n\nGostaria de receber mais informações.`;
  window.open(`https://wa.me/5564992324433?text=${encodeURIComponent(msg)}`, '_blank');
  if (typeof gtag !== 'undefined') gtag('event', 'generate_lead', { event_label: 'Simulador WhatsApp' });
});

// Formulário de contato
document.getElementById('leadForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomeLead').value;
  const whats = document.getElementById('whatsLead').value;
  const msg = `Olá! Meu nome é ${nome}, WhatsApp: ${whats}. Gostaria de receber uma proposta de consórcio.`;
  window.open(`https://wa.me/5564992324433?text=${encodeURIComponent(msg)}`, '_blank');
  e.target.reset();
  if (typeof gtag !== 'undefined') gtag('event', 'generate_lead', { event_label: 'Formulário Contato' });
});

// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 800);
});

// Barra de progresso
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Counters
const counters = document.querySelectorAll('.stat-number[data-target]');
counters.forEach(counter => {
  const updateCount = () => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = parseInt(counter.innerText) || 0;
    const increment = target / 40;
    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Menu mobile
const menuBtn = document.getElementById('menuToggle');
const navList = document.querySelector('.nav-list');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    if (navList.style.display === 'flex') {
      navList.style.display = '';
      navList.style.position = '';
    } else {
      navList.style.display = 'flex';
      navList.style.flexDirection = 'column';
      navList.style.position = 'absolute';
      navList.style.top = '82px';
      navList.style.left = '0';
      navList.style.width = '100%';
      navList.style.background = 'white';
      navList.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      navList.style.padding = '1.5rem';
      navList.style.gap = '1rem';
      navList.style.zIndex = '99';
    }
  });
}

AOS.init({ duration: 800, once: true });