const STORAGE_KEY = 'forca-evolution-player';
const ATTEMPTS = { easy: 10, medium: 6, hard: 3 };
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

// Cada categoria é uma chave do objeto; as listas de palavras facilitam ampliar o conteúdo sem mudar a lógica.
const WORDS = {
  Geral: [
    { text: 'GIRASSOL', hint: 'NATUREZA' },
    { text: 'BICICLETA', hint: 'TRANSPORTE' },
    { text: 'ELEFANTE', hint: 'ANIMAL' },
    { text: 'CORAÇÃO', hint: 'CORPO HUMANO' },
    { text: 'COMPUTADOR', hint: 'TECNOLOGIA' },
    { text: 'BRASIL', hint: 'PAÍS' },
    { text: 'RESTAURANTE', hint: 'LUGAR' },
    { text: 'MELANCIA', hint: 'FRUTA' },
    { text: 'VIOLÃO', hint: 'MÚSICA' },
    { text: 'ASTRONAUTA', hint: 'PROFISSÃO' },
  ],
  Filmes: [
    { text: 'TITANIC', hint: 'NAVEGAÇÃO' },
    { text: 'AVATAR', hint: 'FANTASIA' },
    { text: 'INCEPTION', hint: 'SONHO' },
    { text: 'SHREK', hint: 'DESENHO' },
    { text: 'MATRIX', hint: 'REALIDADE' },
    { text: 'SPIDERMAN', hint: 'HERÓI' },
  ],
  Música: [
    { text: 'PIANO', hint: 'INSTRUMENTO' },
    { text: 'MELODIA', hint: 'CANÇÃO' },
    { text: 'BATERIA', hint: 'INSTRUMENTO' },
    { text: 'ORQUESTRA', hint: 'CONJUNTO' },
    { text: 'MICROFONE', hint: 'ÁUDIO' },
    { text: 'SAXOFONE', hint: 'INSTRUMENTO' },
  ],
  Tecnologia: [
    { text: 'TECLADO', hint: 'PERIFÉRICO' },
    { text: 'CELULAR', hint: 'DISPOSITIVO' },
    { text: 'SOFTWARE', hint: 'PROGRAMAS' },
    { text: 'INTERNET', hint: 'REDE' },
    { text: 'ALGORITMO', hint: 'LÓGICA' },
    { text: 'SATÉLITE', hint: 'ESPAÇO' },
  ],
  Esportes: [
    { text: 'FUTEBOL', hint: 'BOLA' },
    { text: 'BASQUETE', hint: 'QUADRA' },
    { text: 'NATAÇÃO', hint: 'ÁGUA' },
    { text: 'SURFE', hint: 'ONDA' },
    { text: 'CICLISMO', hint: 'PEDAL' },
    { text: 'TÊNIS', hint: 'REDE' },
  ],
  Gastronomia: [
    { text: 'LASANHA', hint: 'MACARRÃO' },
    { text: 'FEIJOADA', hint: 'PRATO' },
    { text: 'QUEIJO', hint: 'LACTEO' },
    { text: 'PANQUECA', hint: 'CAFÉ' },
    { text: 'SOPA', hint: 'CALDO' },
    { text: 'BISCOITO', hint: 'DOCES' },
  ],
  Viagens: [
    { text: 'AEROPORTO', hint: 'VÔO' },
    { text: 'PRAIA', hint: 'MAR' },
    { text: 'MAPA', hint: 'NAVEGAÇÃO' },
    { text: 'HOTEL', hint: 'ESTADA' },
    { text: 'TREM', hint: 'TRILHA' },
    { text: 'MALAS', hint: 'VIAGEM' },
  ],
  Cultura: [
    { text: 'MUSEU', hint: 'ARTE' },
    { text: 'POEMA', hint: 'LITERATURA' },
    { text: 'TEATRO', hint: 'CENA' },
    { text: 'HISTÓRIA', hint: 'PASSADO' },
    { text: 'ARTE', hint: 'EXPRESSÃO' },
    { text: 'BIBLIA', hint: 'RELIGIÃO' },
  ],
  Negócios: [
    { text: 'STARTUP', hint: 'EMPRESA' },
    { text: 'INVESTIR', hint: 'FINANÇAS' },
    { text: 'PRODUTO', hint: 'NEGÓCIO' },
    { text: 'CLIENTE', hint: 'VENDAS' },
    { text: 'MERCADO', hint: 'ECONOMIA' },
    { text: 'LUCRO', hint: 'RESULTADO' },
  ],
};

// Estes dados são apenas demonstração: nenhuma conexão online ou atualização em tempo real é feita.
const MOCK_RANKING = [
  { name: 'Ana', score: 9840 },
  { name: 'Carlos', score: 9420 },
  { name: 'Maria', score: 9110 },
  { name: 'Daniel', score: 8970 },
  { name: 'João', score: 8740 },
  { name: 'Lia', score: 8510 },
  { name: 'Bia', score: 8240 },
  { name: 'Noah', score: 8005 },
];

const MOCK_DATA = {
  onlinePlayers: 1284,
  categoryPlayers: {
    Geral: 326,
    Filmes: 184,
    Música: 142,
    Tecnologia: 208,
    Esportes: 117,
    Gastronomia: 96,
    Viagens: 83,
    Cultura: 74,
    Negócios: 54,
  },
};

const REWARD_MILESTONES = [
  { streak: 3, id: 'streak-3', label: 'Recompensa básica' },
  { streak: 7, id: 'streak-7', label: 'Recompensa especial' },
  { streak: 14, id: 'streak-14', label: 'Recompensa premium' },
];

const DIFFICULTY_CONFIG = {
  easy: { label: 'Fácil', points: 10, rewardMultiplier: 1 },
  medium: { label: 'Médio', points: 25, rewardMultiplier: 1.5 },
  hard: { label: 'Difícil', points: 50, rewardMultiplier: 2 },
};

const ACHIEVEMENT_LABELS = {
  firstWin: 'Primeira vitória',
  streakThree: '3 vitórias seguidas',
  streakFive: '5 vitórias seguidas',
  letterFive: '5 letras certas seguidas',
  letterTen: '10 letras certas seguidas',
  master: 'Mestre das palavras',
  hundredLetters: '100 letras descobertas',
};

const PLAYER_TEMPLATE = {
  name: '',
  category: 'Geral',
  difficulty: 'medium',
  score: 0,
  winStreak: 0,
  letterStreak: 0,
  cognitiveScore: 0,
  bestLetterStreak: 0,
  totalCorrectLetters: 0,
  gamesPlayed: 0,
  achievements: [],
  rewards: [],
  isPlus: false,
  level: 1,
  wins: 0,
  losses: 0,
};

// Preferências e progresso ficam no jogador; palavra e palpites existem apenas durante a rodada atual.
const savedPlayer = loadPlayer();

const state = {
  player: savedPlayer,
  currentCategory: WORDS[savedPlayer.category] ? savedPlayer.category : 'Geral',
  currentDifficulty: ATTEMPTS[savedPlayer.difficulty] ? savedPlayer.difficulty : 'medium',
  word: null,
  guessed: new Set(),
  round: 1,
  gameFinished: false,
  lastResult: null,
  newAchievements: [],
  newRewards: [],
};

const elements = {
  playerScreen: document.getElementById('player-screen'),
  menuScreen: document.getElementById('menu-screen'),
  gameScreen: document.getElementById('game-screen'),
  resultScreen: document.getElementById('result-screen'),
  playerNameInput: document.getElementById('player-name'),
  welcomeTitle: document.getElementById('welcome-title'),
  welcomeSubtitle: document.getElementById('welcome-subtitle'),
  enterPlayer: document.getElementById('enter-player'),
  switchUser: document.getElementById('switch-user'),
  playerNameBadge: document.getElementById('player-name-badge'),
  playerStreak: document.getElementById('player-streak'),
  menuWinStreak: document.getElementById('menu-win-streak'),
  menuLevel: document.getElementById('menu-level'),
  menuCognitive: document.getElementById('menu-cognitive'),
  menuLetterStreak: document.getElementById('menu-letter-streak'),
  playerRank: document.getElementById('player-rank'),
  categoryList: document.getElementById('category-list'),
  difficultyButtons: document.querySelectorAll('.difficulty-button'),
  startGameButton: document.getElementById('start-game'),
  rankingList: document.getElementById('ranking-list'),
  rewardBadge: document.getElementById('reward-badge'),
  rewardSummary: document.getElementById('reward-summary'),
  achievementList: document.getElementById('achievement-list'),
  journeyLevel: document.getElementById('journey-level'),
  journeyAvatar: document.getElementById('journey-avatar'),
  journeyStage: document.getElementById('journey-stage'),
  journeyNext: document.getElementById('journey-next'),
  journeyFill: document.getElementById('journey-fill'),
  onlineCount: document.getElementById('online-count'),
  categoryOnlineCount: document.getElementById('category-online-count'),
  healthFill: document.getElementById('health-fill'),
  healthCopy: document.getElementById('health-copy'),
  headerPlayer: document.getElementById('header-player'),
  headerCategory: document.getElementById('header-category'),
  gameLetterStreak: document.getElementById('game-letter-streak'),
  gameWinStreak: document.getElementById('game-win-streak'),
  gameCognitiveScore: document.getElementById('game-cognitive-score'),
  wordProgressLabel: document.getElementById('word-progress-label'),
  wordProgressFill: document.getElementById('word-progress-fill'),
  drawingCaption: document.getElementById('drawing-caption'),
  gallows: document.getElementById('gallows'),
  remainingCount: document.getElementById('remaining-count'),
  maxCount: document.getElementById('max-count'),
  meterFill: document.getElementById('meter-fill'),
  meterCaption: document.getElementById('meter-caption'),
  statusLine: document.getElementById('game-status'),
  statusIcon: document.querySelector('.status-icon'),
  statusText: document.getElementById('status-text'),
  wordHint: document.getElementById('word-hint'),
  wordSlots: document.getElementById('word-slots'),
  wordLength: document.getElementById('word-length'),
  wordCategory: document.getElementById('word-category'),
  usedCount: document.getElementById('used-count'),
  usedLetters: document.getElementById('used-letters'),
  virtualKeyboard: document.getElementById('virtual-keyboard'),
  resultTitle: document.getElementById('result-title'),
  resultEyebrow: document.getElementById('result-eyebrow'),
  resultSymbol: document.getElementById('result-symbol'),
  resultMessage: document.getElementById('result-message'),
  resultCard: document.querySelector('.result-card'),
  resultWord: document.getElementById('result-word'),
  resultPoints: document.getElementById('result-points'),
  resultStreak: document.getElementById('result-streak'),
  resultHealth: document.getElementById('result-health'),
  resultAchievement: document.getElementById('result-achievement'),
  resultReward: document.getElementById('result-reward'),
  playAgain: document.getElementById('play-again'),
  backMenu: document.getElementById('back-menu'),
  plusInfo: document.getElementById('plus-info'),
  plusDialog: document.getElementById('plus-dialog'),
};

function loadPlayer() {
  // JSON converte o texto do navegador de volta em objeto; dados inválidos iniciam um perfil limpo.
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return saved ? { ...PLAYER_TEMPLATE, ...saved } : { ...PLAYER_TEMPLATE };
  } catch {
    return { ...PLAYER_TEMPLATE };
  }
}

function savePlayer() {
  // localStorage preserva o perfil entre visitas neste navegador, sem conta ou servidor.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.player));
}

function normalizeLetter(value) {
  if (!value) return '';
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

function getWordPool(category) {
  return WORDS[category] || WORDS.Geral;
}

function createRandomWord() {
  const options = getWordPool(state.currentCategory);
  const currentText = state.word?.text || '';
  const filtered = options.filter((entry) => entry.text !== currentText);
  const pool = filtered.length ? filtered : options;
  const selection = pool[Math.floor(Math.random() * pool.length)];
  state.word = selection;
  state.guessed = new Set();
  state.gameFinished = false;
  state.lastResult = null;
  state.newAchievements = [];
  state.newRewards = [];
  renderBoard();
}

function updateDifficultyButtons() {
  elements.difficultyButtons.forEach((button) => {
    const active = button.dataset.difficulty === state.currentDifficulty;
    button.classList.toggle('active', active);
  });
}

function getErrors() {
  if (!state.word) return 0;
  const letters = [...state.word.text].map(normalizeLetter);
  return [...state.guessed].filter((used) => !letters.includes(used)).length;
}

function getMaxAttempts() {
  return ATTEMPTS[state.currentDifficulty] ?? ATTEMPTS.medium;
}

function renderCategoryList() {
  const categories = Object.keys(WORDS);
  elements.categoryList.innerHTML = categories
    .map((category) => `
      <button class="category-item ${category === state.currentCategory ? 'active' : ''}" type="button" data-category="${category}">
        <strong>${category}</strong>
        <span>${WORDS[category].length} palavras</span>
      </button>
    `)
    .join('');

  elements.categoryList.querySelectorAll('.category-item').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentCategory = button.dataset.category;
      state.player.category = state.currentCategory;
      savePlayer();
      renderCategoryList();
      updatePlayerStatus();
    });
  });
}

function renderRanking() {
  // A camada mock fica separada da interface para ser substituída por uma API no futuro.
  const playerName = state.player.name || 'Você';
  const playerScore = state.player.score || 0;
  const rankPosition = MOCK_RANKING.filter((item) => item.score > playerScore).length + 1;
  const topPlayers = [...MOCK_RANKING].sort((first, second) => second.score - first.score).slice(0, 5);
  const playerIsInTop = playerScore >= topPlayers.at(-1).score;
  const entries = playerIsInTop
    ? [...MOCK_RANKING, { name: playerName, score: playerScore }].sort((first, second) => second.score - first.score).slice(0, 5)
    : [...topPlayers, { name: playerName, score: playerScore, rank: rankPosition }];

  elements.playerRank.textContent = rankPosition;
  elements.rankingList.innerHTML = entries.map((item, index) => {
    const isPlayer = item.name === playerName;
    const rank = item.rank || (isPlayer ? rankPosition : index + 1);
    return `
      <li class="${isPlayer ? 'active' : ''}">
        <strong>${String(rank).padStart(2, '0')}</strong>
        <span>${item.name}</span>
        <strong>${item.score.toLocaleString('pt-BR')}</strong>
      </li>
    `;
  }).join('');
}

function calculateRewardTier() {
  const milestone = [...REWARD_MILESTONES].reverse().find((item) => state.player.winStreak >= item.streak);
  return milestone?.label || 'Em progresso';
}

function renderRewards() {
  const rewardIds = state.player.rewards;
  const earnedMilestones = REWARD_MILESTONES.filter((item) => rewardIds.includes(`${state.currentDifficulty}:${item.id}`));
  const latestReward = earnedMilestones.at(-1);
  const nextMilestone = REWARD_MILESTONES.find((item) => !rewardIds.includes(`${state.currentDifficulty}:${item.id}`));
  const winsNeeded = nextMilestone ? Math.max(1, nextMilestone.streak - (state.player.winStreak || 0)) : 0;
  const rewardCopy = latestReward
    ? `${latestReward.label} desbloqueada`
    : nextMilestone
      ? `${winsNeeded} ${winsNeeded === 1 ? 'vitória' : 'vitórias'} para ${nextMilestone.label}`
      : 'Todas as recompensas foram desbloqueadas.';

  elements.rewardBadge.textContent = latestReward?.label || calculateRewardTier();
  elements.rewardSummary.textContent = `${earnedMilestones.length} liberadas · ${rewardCopy}`;
}

function renderAchievements() {
  const unlocked = [...state.player.achievements].reverse().slice(0, 4);
  elements.achievementList.innerHTML = unlocked.length
    ? unlocked.map((id) => `<li>${ACHIEVEMENT_LABELS[id] || id}</li>`).join('')
    : '<li class="achievement-empty">Suas conquistas aparecerão aqui.</li>';
}

function getJourney() {
  const streak = state.player.winStreak || 0;
  if (streak >= 14) return { avatar: '🌳', stage: 'Copa da comunidade', next: 'Jornada no nível máximo', progress: 100 };
  if (streak >= 7) return { avatar: '🌳', stage: 'Árvore em crescimento', next: `${14 - streak} vitórias para o próximo marco`, progress: (streak / 14) * 100 };
  if (streak >= 3) return { avatar: '🌿', stage: 'Sua planta criou raízes', next: `${7 - streak} vitórias para o próximo marco`, progress: (streak / 14) * 100 };
  return { avatar: '🌱', stage: 'Uma nova jornada começa', next: `${3 - streak} vitórias para o primeiro marco`, progress: (streak / 14) * 100 };
}

function updatePlayerStatus() {
  const playerName = state.player.name || 'Jogador';
  elements.playerNameBadge.textContent = playerName;
  elements.playerStreak.textContent = String(state.player.winStreak || 0);
  elements.menuWinStreak.textContent = String(state.player.winStreak || 0);
  elements.menuLevel.textContent = String(state.player.level || 1);
  elements.menuCognitive.textContent = String(state.player.cognitiveScore || 0);
  elements.menuLetterStreak.textContent = String(state.player.letterStreak || 0);
  elements.headerPlayer.textContent = playerName;
  elements.headerCategory.textContent = state.currentCategory;
  elements.onlineCount.textContent = MOCK_DATA.onlinePlayers.toLocaleString('pt-BR');
  elements.categoryOnlineCount.textContent = (MOCK_DATA.categoryPlayers[state.currentCategory] || 0).toLocaleString('pt-BR');

  const healthPercent = Math.min(100, Math.max(0, state.player.cognitiveScore));
  elements.healthFill.style.width = `${healthPercent}%`;
  elements.healthCopy.textContent = `${state.player.cognitiveScore || 0} pontos de atividade cognitiva · indicador lúdico`;

  const journey = getJourney();
  elements.journeyAvatar.textContent = journey.avatar;
  elements.journeyStage.textContent = journey.stage;
  elements.journeyNext.textContent = journey.next;
  elements.journeyLevel.textContent = `Nível ${state.player.level || 1}`;
  elements.journeyFill.style.width = `${journey.progress}%`;
  elements.gameLetterStreak.textContent = String(state.player.letterStreak || 0);
  elements.gameWinStreak.textContent = String(state.player.winStreak || 0);
  elements.gameCognitiveScore.textContent = String(state.player.cognitiveScore || 0);
}

function renderKeyboard() {
  // O teclado virtual e o físico convergem em handleGuess, mantendo uma única regra de jogo.
  const usedLetters = new Set(state.guessed);
  const lettersInWord = new Set([...state.word.text].map((letter) => normalizeLetter(letter).replace(/[^A-Z]/g, '')));

  elements.virtualKeyboard.innerHTML = KEYBOARD_ROWS.map((row) => `
    <div class="keyboard-row">
      ${row.map((letter) => {
        const normalized = normalizeLetter(letter);
        const guessed = usedLetters.has(normalized);
        const correct = normalized && lettersInWord.has(normalized);
        let classes = 'keyboard-key';
        if (guessed) classes += ' used';
        if (guessed && correct) classes += ' correct';
        if (guessed && !correct) classes += ' wrong';
        return `<button class="${classes}" type="button" data-letter="${letter}" ${guessed ? 'disabled' : ''}>${letter}</button>`;
      }).join('')}
    </div>
  `).join('');

  elements.virtualKeyboard.querySelectorAll('.keyboard-key').forEach((button) => {
    button.addEventListener('click', () => {
      handleGuess(button.dataset.letter);
    });
  });
}

function renderBoard() {
  if (!state.word) return;

  // O estado é calculado uma vez e refletido no desenho, progresso, letras e teclas visuais.
  const maxAttempts = getMaxAttempts();
  const letters = [...state.word.text].map(normalizeLetter);
  const errors = getErrors();
  const remaining = maxAttempts - errors;
  const won = letters.every((letter) => !/[A-Z]/.test(letter) || state.guessed.has(letter));
  const lost = remaining <= 0;
  const finished = won || lost;
  const drawnParts = Math.min(6, Math.ceil((errors / maxAttempts) * 6));
  const totalLetters = letters.filter((letter) => /[A-Z]/.test(letter)).length;
  const foundLetters = new Set(letters.filter((letter) => /[A-Z]/.test(letter) && state.guessed.has(letter))).size;

  elements.drawingCaption.textContent = won ? 'Muito bem!' : lost ? 'Até a próxima' : errors === 0 ? 'Tudo tranquilo' : 'Siga em frente';
  elements.remainingCount.textContent = String(Math.max(0, remaining)).padStart(2, '0');
  elements.maxCount.textContent = String(maxAttempts).padStart(2, '0');
  elements.meterFill.style.width = `${Math.max(0, (remaining / maxAttempts) * 100)}%`;
  elements.meterCaption.textContent = lost ? 'As chances acabaram.' : errors === 0 ? 'A aventura começa agora.' : `${errors} letras erradas até aqui.`;

  elements.gallows.querySelectorAll('.gallows-person').forEach((part) => {
    const shouldShow = Number(part.dataset.part) <= drawnParts;
    part.classList.toggle('visible', shouldShow);
  });

  elements.statusLine.classList.toggle('success', won);
  elements.statusLine.classList.toggle('error', lost);
  elements.statusIcon.textContent = won ? '✓' : lost ? '!' : '?';
  elements.statusText.textContent = won
    ? 'Incrível! Você descobriu a palavra.'
    : lost
      ? `Fim de jogo! A palavra era ${state.word.text}.`
      : 'Continue tentando. Sua sequência depende de cada acerto.';

  const lettersInWord = letters.filter((letter) => /[A-Z]/.test(letter));
  elements.wordHint.textContent = `DICA: ${state.word.hint}`;
  elements.wordLength.textContent = String(lettersInWord.length);
  elements.wordCategory.textContent = state.currentCategory;
  elements.wordProgressLabel.textContent = `${foundLetters} / ${totalLetters}`;
  elements.wordProgressFill.style.width = `${totalLetters ? (foundLetters / totalLetters) * 100 : 0}%`;

  elements.wordSlots.innerHTML = [...state.word.text].map((char) => {
    const normalized = normalizeLetter(char);
    const punctuation = !/[A-Z]/.test(normalized);
    const isRevealed = punctuation || state.guessed.has(normalized) || lost;
    const className = punctuation ? 'word-punctuation' : 'word-slot';

    const slot = document.createElement('span');
    slot.className = className;
    if (!punctuation && isRevealed) slot.classList.add('revealed');
    if (!punctuation && lost && !state.guessed.has(normalized)) slot.classList.add('missed');
    slot.textContent = isRevealed ? char : '';
    return slot;
  }).map((node) => node.outerHTML).join('');

  const usedItems = [...state.guessed].map((letter) => {
    const item = document.createElement('span');
    item.className = `used-letter ${letters.includes(letter) ? 'correct' : 'incorrect'}`;
    item.textContent = letter;
    return item;
  });

  elements.usedCount.textContent = `(${state.guessed.size})`;
  elements.usedLetters.innerHTML = usedItems.length
    ? usedItems.map((item) => item.outerHTML).join('')
    : '<span class="empty-used">Nenhuma por enquanto</span>';

  renderKeyboard();

  if (finished && !state.gameFinished) {
    finishRound(won ? 'won' : 'lost');
  }
}

function awardPointValue() {
  return DIFFICULTY_CONFIG[state.currentDifficulty]?.points || DIFFICULTY_CONFIG.medium.points;
}

function unlockAchievement(name, label) {
  if (!state.player.achievements.includes(name)) {
    state.player.achievements.push(name);
    state.newAchievements.push(label || ACHIEVEMENT_LABELS[name] || name);
  }
}

function evaluateProgress(won) {
  // Dificuldade multiplica pontos; marcos e conquistas ficam centralizados em configurações/listas.
  const nextWinStreak = won ? (state.player.winStreak || 0) + 1 : 0;
  const difficulty = DIFFICULTY_CONFIG[state.currentDifficulty] || DIFFICULTY_CONFIG.medium;
  const points = won
    ? Math.round((awardPointValue() + Math.min(nextWinStreak * 5, 50)) * difficulty.rewardMultiplier)
    : 0;

  state.player.score += points;
  state.player.cognitiveScore = Math.min(100, (state.player.cognitiveScore || 0) + (won ? 12 : 3));
  state.player.winStreak = nextWinStreak;
  state.player.wins = won ? state.player.wins + 1 : state.player.wins;
  state.player.losses = won ? state.player.losses : state.player.losses + 1;
  state.player.gamesPlayed = (state.player.gamesPlayed || 0) + 1;
  state.player.level = Math.max(1, Math.floor(state.player.score / 250) + 1);

  if (won) {
    unlockAchievement('firstWin');
    if (state.player.winStreak >= 3) unlockAchievement('streakThree');
    if (state.player.winStreak >= 5) unlockAchievement('streakFive');
    if (state.player.score >= 250) unlockAchievement('master');
  }

  if (state.player.totalCorrectLetters >= 100) {
    unlockAchievement('hundredLetters');
  }

  const eligibleMilestones = won
    ? REWARD_MILESTONES.filter((item) => item.streak <= state.player.winStreak)
    : [];
  eligibleMilestones.forEach((milestone) => {
    const rewardId = `${state.currentDifficulty}:${milestone.id}`;
    if (!state.player.rewards.includes(rewardId)) {
      state.player.rewards.push(rewardId);
      state.newRewards.push(milestone);
    }
  });

  savePlayer();
  renderRanking();
  renderRewards();
  renderAchievements();
  updatePlayerStatus();
  return points;
}

function finishRound(result) {
  if (state.gameFinished) return;
  state.gameFinished = true;
  const won = result === 'won';
  const points = evaluateProgress(won);
  const newReward = state.newRewards.at(-1);

  state.lastResult = {
    result: won ? 'Você venceu!' : 'Você perdeu!',
    word: state.word.text,
    points,
    streak: state.player.winStreak,
    health: won ? 12 : 3,
    achievements: [...state.newAchievements],
    reward: newReward ? `${newReward.label} · ${DIFFICULTY_CONFIG[state.currentDifficulty].label}` : 'Nenhuma nova recompensa nesta partida',
  };

  elements.resultCard.classList.toggle('victory', won);
  elements.resultCard.classList.toggle('defeat', !won);
  elements.resultEyebrow.textContent = won ? 'VITÓRIA' : 'DERROTA';
  elements.resultSymbol.textContent = won ? '🏆' : '↻';
  elements.resultTitle.textContent = won ? 'Você venceu!' : 'Você perdeu!';
  elements.resultMessage.textContent = won
    ? 'Você descobriu a palavra e avançou na sua jornada.'
    : 'As tentativas acabaram. Tente outra vez e avance na sua jornada.';
  elements.resultWord.textContent = won ? `Palavra: ${state.word.text}` : `A palavra era: ${state.word.text}`;
  elements.resultPoints.textContent = String(state.lastResult.points || 0);
  elements.resultStreak.textContent = String(state.lastResult.streak || 0);
  elements.resultHealth.textContent = `+${state.lastResult.health}`;
  elements.resultAchievement.textContent = state.lastResult.achievements.length
    ? `Conquista: ${state.lastResult.achievements.join(' · ')}`
    : 'Nenhuma nova conquista nesta partida';
  elements.resultReward.textContent = `🎁 ${state.lastResult.reward}`;
  elements.playAgain.textContent = won ? 'Continuar jornada' : 'Tentar novamente';

  setTimeout(() => {
    openScene('result');
  }, 150);
}

function handleGuess(letter) {
  // Esta função valida uma letra, atualiza sequências e chama a renderização comum da partida.
  const normalized = normalizeLetter(letter);
  if (!normalized || !/^[A-Z]$/.test(normalized) || state.gameFinished) return;
  if (state.guessed.has(normalized)) return;

  state.guessed.add(normalized);
  const lettersInWord = [...state.word.text].map(normalizeLetter);
  if (lettersInWord.includes(normalized)) {
    state.player.letterStreak = (state.player.letterStreak || 0) + 1;
    state.player.bestLetterStreak = Math.max(state.player.bestLetterStreak || 0, state.player.letterStreak);
    state.player.totalCorrectLetters = (state.player.totalCorrectLetters || 0) + 1;
    if (state.player.letterStreak >= 5) unlockAchievement('letterFive');
    if (state.player.letterStreak >= 10) unlockAchievement('letterTen');
  } else {
    state.player.letterStreak = 0;
  }
  savePlayer();
  updatePlayerStatus();
  renderBoard();
}

function openScene(scene) {
  const scenes = {
    player: elements.playerScreen,
    menu: elements.menuScreen,
    game: elements.gameScreen,
    result: elements.resultScreen,
  };

  Object.entries(scenes).forEach(([key, node]) => {
    node.classList.toggle('hidden', key !== scene);
    if (key === scene && key !== 'player') {
      node.style.display = 'grid';
    } else if (key !== scene) {
      node.style.display = 'none';
    }
  });

  if (scene === 'player') {
    elements.playerScreen.style.display = 'grid';
  }
}

function goToMenu() {
  openScene('menu');
  updatePlayerStatus();
  renderRanking();
  renderRewards();
}

function beginGame() {
  if (!state.player.name) return;
  state.player.category = state.currentCategory;
  state.player.difficulty = state.currentDifficulty;
  updatePlayerStatus();
  createRandomWord();
  openScene('game');
}

function setupPlayer(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    elements.playerNameInput.focus();
    return;
  }

  state.player.name = trimmed;
  state.player.category = state.currentCategory;
  state.player.difficulty = state.currentDifficulty;
  savePlayer();

  elements.welcomeTitle.textContent = `Olá, ${trimmed}!`;
  elements.welcomeSubtitle.textContent = 'Pronto para continuar sua jornada?';
  elements.switchUser.classList.remove('hidden');
  elements.playerNameInput.value = trimmed;
  goToMenu();
}

function initialize() {
  // Eventos conectam os controles do HTML às funções; ao final, a sessão persistida é restaurada.
  elements.playerNameInput.value = state.player.name || '';
  elements.switchUser.addEventListener('click', () => {
    state.player = { ...PLAYER_TEMPLATE };
    state.currentCategory = 'Geral';
    state.currentDifficulty = 'medium';
    localStorage.removeItem(STORAGE_KEY);
    elements.playerNameInput.value = '';
    elements.welcomeTitle.textContent = 'Olá!';
    elements.welcomeSubtitle.textContent = 'Como podemos chamar você?';
    elements.switchUser.classList.add('hidden');
    renderCategoryList();
    updateDifficultyButtons();
    openScene('player');
    elements.playerNameInput.focus();
  });

  elements.enterPlayer.addEventListener('click', () => {
    setupPlayer(elements.playerNameInput.value);
  });

  elements.playerNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') setupPlayer(elements.playerNameInput.value);
  });

  elements.difficultyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.currentDifficulty = button.dataset.difficulty;
      state.player.difficulty = state.currentDifficulty;
      savePlayer();
      updateDifficultyButtons();
      renderRewards();
    });
  });

  elements.startGameButton.addEventListener('click', beginGame);
  elements.playAgain.addEventListener('click', () => {
    elements.resultScreen.style.display = 'none';
    beginGame();
  });
  elements.backMenu.addEventListener('click', () => {
    elements.resultScreen.style.display = 'none';
    goToMenu();
  });
  elements.plusInfo.addEventListener('click', () => elements.plusDialog.showModal());

  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) return;
    if (elements.gameScreen.classList.contains('hidden')) return;
    const letter = normalizeLetter(event.key);
    if (/^[A-Z]$/.test(letter)) {
      handleGuess(letter);
    }
  });

  renderCategoryList();
  updateDifficultyButtons();
  renderRewards();
  renderRanking();
  renderAchievements();
  updatePlayerStatus();

  if (state.player.name) {
    elements.playerNameInput.value = state.player.name;
    elements.welcomeTitle.textContent = `Olá, ${state.player.name}!`;
    elements.welcomeSubtitle.textContent = 'Pronto para continuar sua jornada?';
    elements.switchUser.classList.remove('hidden');
    goToMenu();
  } else {
    openScene('player');
  }
}

initialize();
