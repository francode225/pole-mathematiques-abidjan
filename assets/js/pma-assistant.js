(function () {
  const root = document.getElementById('pma-assistant');
  if (!root) return;

  const launcher = root.querySelector('.pma-assistant__launcher');
  const panel = root.querySelector('#pma-assistant-panel');
  const closeBtn = root.querySelector('.pma-assistant__close');
  const messages = root.querySelector('.pma-assistant__messages');
  const form = root.querySelector('.pma-assistant__input');
  const input = form ? form.querySelector('input[name="message"]') : null;

  const faq = [
    { q: /tarif|prix|coût|combien/i, a: "Le tarif est de 30 000 F CFA par mois pour le programme PMA." },
    { q: /contact|téléphone|whats/i, a: "Téléphone/WhatsApp: (+225) 07 18 15 90 86 / 05 84 23 56 56." },
    { q: /email|mail/i, a: "Email: polemathematiquesabidjan@gmail.com" },
    { q: /adresse|où|localisation|lieu/i, a: "Nous sommes au Groupe Scolaire Sogefiah, Riviera 2, Abidjan." },
    { q: /horaire|ouvert|heures/i, a: "Horaires: Lun-Ven 8h-18h, Sam 8h-16h, Dim sur rendez-vous." },
    { q: /programme|cours|module|analyse|algèbre|probabilit/i, a: "Programmes: Analyse, Algèbre, Probabilités & Statistiques. Détails dans la section Programmes (#programs)." },
    { q: /inscription|s'inscrire/i, a: "Pour vous inscrire, utilisez le formulaire de contact en bas de page (#contact)." },
    { q: /concours|ensea|esatic|inphb|eamac|isfa/i, a: "Nous préparons aux concours ENSEA, ESATIC, INPHB, EAMAC, ISFA, etc. Simulations et entraînements inclus." }
  ];

  function appendMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = 'pma-assistant__msg ' + (isUser ? 'pma-assistant__msg--user' : 'pma-assistant__msg--bot');
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function answerFor(text) {
    for (const { q, a } of faq) {
      if (q.test(text)) return a;
    }
    return "Je n'ai pas bien compris. Vous pouvez demander: tarif, inscription, horaires, adresse, programmes ou concours.";
  }

  function openPanel() {
    if (!panel) return;
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    input && input.focus();
  }

  function closePanel() {
    if (!panel) return;
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
  }

  launcher && launcher.addEventListener('click', function () {
    if (panel.hidden) openPanel(); else closePanel();
  });

  closeBtn && closeBtn.addEventListener('click', closePanel);

  form && form.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = (input && input.value || '').trim();
    if (!text) return;
    appendMessage(text, true);
    input.value = '';
    setTimeout(function () {
      appendMessage(answerFor(text), false);
    }, 150);
  });
})();


