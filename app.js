const screens = [
  {
    id: "hub",
    step: 1,
    eyebrow: "ONBOARDING",
    title: "Vamos fazer sua primeira aplicação",
    subtitle:
      "A gente te guia pelos passos essenciais. O objetivo é você sair daqui com sua primeira aplicação concluída.",
    primaryLabel: "Começar",
    secondaryLabel: "Ver dúvidas",
    content: `
      <div class="card progress-card">
        <div class="progress-header">
          <span>Progresso</span>
          <span>1 de 4</span>
        </div>
        <div class="progress-bar" aria-label="Progresso do onboarding">
          <span style="width: 25%"></span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Próximo passo</h2>
            <p class="card-copy">Complete seu perfil para liberar a verificação da conta.</p>
          </div>
          <span class="badge">2 min</span>
        </div>
      </div>

      ${renderChecklist(1)}
    `,
  },
  {
    id: "profile",
    step: 2,
    eyebrow: "PERFIL",
    title: "A gente precisa confirmar alguns dados",
    subtitle:
      "É rápido. Esses dados ajudam a liberar sua carteira e manter sua conta protegida.",
    primaryLabel: "Continuar",
    secondaryLabel: "Por que pedimos isso?",
    content: `
      <div class="card progress-card">
        <div class="progress-header">
          <span>Etapa 1 de 4</span>
          <span>Perfil</span>
        </div>
        <div class="progress-bar">
          <span style="width: 35%"></span>
        </div>
      </div>

      <div class="card field-stack">
        <div class="field">
          <label for="cpf">CPF</label>
          <input id="cpf" value="000.000.000-00" inputmode="numeric" />
        </div>
        <div class="field">
          <label for="birthdate">Data de nascimento</label>
          <input id="birthdate" value="12/04/1994" inputmode="numeric" />
        </div>
      </div>

      <div class="card is-secondary">
        <h2 class="card-title">Sem juridiquês</h2>
        <p class="card-copy">
          Usamos seus dados para cumprir regras de segurança e liberar produtos adequados ao seu perfil.
        </p>
      </div>
    `,
  },
  {
    id: "verification",
    step: 3,
    eyebrow: "VERIFICAÇÃO",
    title: "Sua conta está quase pronta",
    subtitle:
      "Enquanto a análise termina, você já pode conhecer opções simples para começar.",
    primaryLabel: "Ver opções",
    secondaryLabel: "Falar com suporte",
    content: `
      <div class="card progress-card">
        <div class="progress-header">
          <span>Progresso</span>
          <span>2 de 4</span>
        </div>
        <div class="progress-bar">
          <span style="width: 50%"></span>
        </div>
      </div>

      ${renderChecklist(2, true)}

      <div class="card is-warning">
        <div class="card-header">
          <div>
            <h2 class="card-title">Verificação pendente</h2>
            <p class="card-copy">
              Normalmente leva alguns minutos. Se algo travar, você pode pedir ajuda sem sair daqui.
            </p>
          </div>
          <span class="badge warning">Atenção</span>
        </div>
      </div>
    `,
  },
  {
    id: "investment",
    step: 4,
    eyebrow: "INVESTIR",
    title: "Escolha sua primeira aplicação",
    subtitle:
      "Para começar sem complicação, destacamos uma opção com baixo risco e liquidez diária.",
    primaryLabel: "Aplicar agora",
    secondaryLabel: "Me ajude a escolher",
    content: `
      <div class="card investment-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Reserva Arena</h2>
            <p class="card-copy">Baixo risco, liquidez diária e aplicação a partir de R$ 10.</p>
          </div>
          <span class="yield">12,3% a.a.</span>
        </div>
        <div class="investment-meta">
          <span class="badge success">Recomendado</span>
          <span class="badge">R$ 10 min.</span>
          <span class="badge">D+0</span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Renda Fixa</h2>
            <p class="card-copy">Prazo maior, retorno previsto e baixa volatilidade.</p>
          </div>
          <span class="yield">13,1% a.a.</span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Cripto</h2>
            <p class="card-copy">Maior risco. Melhor para quem já entende volatilidade.</p>
          </div>
          <span class="badge warning">Alto risco</span>
        </div>
      </div>
    `,
  },
  {
    id: "success",
    step: 5,
    eyebrow: "PRIMEIRA VITÓRIA",
    title: "Primeira aplicação concluída",
    subtitle:
      "Você começou sua jornada na ArenaCash. Agora dá para acompanhar rendimento e montar sua próxima meta.",
    primaryLabel: "Ir para carteira",
    secondaryLabel: "Recomeçar fluxo",
    content: `
      <div class="card is-success">
        <div class="card-header">
          <div>
            <h2 class="card-title">Você aplicou <span class="money">R$ 50</span></h2>
            <p class="card-copy">Produto: Reserva Arena. Seu comprovante já está salvo na carteira.</p>
          </div>
          <span class="badge success">Concluído</span>
        </div>
      </div>

      <div class="card">
        <h2 class="card-title">Próximos passos</h2>
        <ul class="checklist" aria-label="Próximos passos">
          <li class="check-item"><span class="check-icon">1</span><span>Acompanhar rendimento</span><span class="badge">Hoje</span></li>
          <li class="check-item"><span class="check-icon">2</span><span>Criar meta financeira</span><span class="badge">Opcional</span></li>
          <li class="check-item"><span class="check-icon">3</span><span>Conhecer outros produtos</span><span class="badge">Depois</span></li>
        </ul>
      </div>
    `,
  },
];

let currentScreenIndex = 0;

const screenRoot = document.querySelector("#screenRoot");
const backButton = document.querySelector("#backButton");

function renderChecklist(currentStep, hasPendingState = false) {
  const items = [
    "Perfil completo",
    "Conta verificada",
    "Dinheiro disponível",
    "Primeira aplicação feita",
  ];

  return `
    <div class="card is-secondary">
      <h2 class="card-title">Checklist</h2>
      <ul class="checklist" aria-label="Checklist de ativação">
        ${items
          .map((item, index) => {
            const step = index + 1;
            const stateClass =
              step < currentStep ? "is-done" : step === currentStep ? "is-current" : "";
            const icon = step < currentStep ? "✓" : step === currentStep && hasPendingState ? "!" : step;
            const badge =
              step < currentStep
                ? '<span class="badge success">feito</span>'
                : step === currentStep && hasPendingState
                  ? '<span class="badge warning">pendente</span>'
                  : '<span class="badge">próximo</span>';

            return `
              <li class="check-item ${stateClass}">
                <span class="check-icon">${icon}</span>
                <span>${item}</span>
                ${badge}
              </li>
            `;
          })
          .join("")}
      </ul>
    </div>
  `;
}

function renderScreen() {
  const screen = screens[currentScreenIndex];
  const isLastScreen = currentScreenIndex === screens.length - 1;

  screenRoot.innerHTML = `
    <p class="eyebrow">${screen.eyebrow}</p>
    <h1 class="title">${screen.title}</h1>
    <p class="subtitle">${screen.subtitle}</p>
    <div class="section-stack">
      ${screen.content}
      <div class="actions">
        <button class="button primary" id="primaryAction" type="button">${screen.primaryLabel}</button>
        <button class="button ${isLastScreen ? "secondary" : "tertiary"}" id="secondaryAction" type="button">
          ${screen.secondaryLabel}
        </button>
      </div>
      <footer class="product-arena-footer" aria-label="Assinatura Product Arena">
        <strong>PRODUCT ARENA</strong><br />
        na prática, a teoria é bem diferente.
      </footer>
    </div>
  `;

  backButton.disabled = currentScreenIndex === 0;
  document.querySelector("#primaryAction").addEventListener("click", goForward);
  document.querySelector("#secondaryAction").addEventListener("click", handleSecondaryAction);
}

function goForward() {
  if (currentScreenIndex < screens.length - 1) {
    currentScreenIndex += 1;
  }

  renderScreen();
}

function goBack() {
  if (currentScreenIndex > 0) {
    currentScreenIndex -= 1;
    renderScreen();
  }
}

function handleSecondaryAction() {
  if (currentScreenIndex === screens.length - 1) {
    currentScreenIndex = 0;
    renderScreen();
    return;
  }

  window.alert("Ajuda contextual: explicação curta, humana e ligada ao passo atual.");
}

backButton.addEventListener("click", goBack);
renderScreen();
