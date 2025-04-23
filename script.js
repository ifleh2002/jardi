document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json') // Assurez-vous que votre fichier JSON est nommé 'data.json' et au même emplacement que votre HTML
        .then(response => response.json())
        .then(data => {
            afficherHypothesesCles(data.hypothesesCles);
            afficherPlanInvestissement(data.planInvestissementInitial);
            afficherChargesExploitation(data.chargesExploitationPrevisionnelles.annee1);
            afficherPrevisionsCA(data.previsionsChiffreAffaires);
            afficherPlanFinancement(data.planFinancementInitial);
            afficherCompteResultat(data.compteResultatPrevisionnel);
            afficherSeuilRentabilite(data.seuilRentabilite);
            afficherConclusion(data.conclusionMiseAJour);
        })
        .catch(error => console.error('Erreur lors du chargement des données:', error));
});

function afficherHypothesesCles(data) {
    const section = document.getElementById('hypotheses-cles');
    section.innerHTML += `<div class="data-item"><strong>Personnel :</strong> ${data.personnel.map(p => `${p.poste} (${p.salaireBrut} MAD)`).join(', ')}</div>`;
    section.innerHTML += `<div class="data-item"><strong>Coût Total Mensuel Personnel Estimé :</strong> ${data.coutTotalMensuelPersonnel} MAD</div>`;
    section.innerHTML += `<div class="data-item"><strong>Véhicule :</strong> <span class="math-inline">\{data\.vehicule\.type\} \(</span>{data.vehicule.prix} MAD)</div>`;
    section.innerHTML += `<div class="data-item"><strong>Loyer Logement Ouvriers :</strong> ${data.loyerLogementOuvriers} MAD/mois</div>`;
    section.innerHTML += `<div class="data-item"><strong>Zone de chalandise :</strong> ${data.zoneChalandise}</div>`;
    section.innerHTML += `<div class="data-item"><strong>Autres :</strong> ${data.autres}</div>`;
}

function afficherPlanInvestissement(data) {
    const section = document.getElementById('plan-investissement');
    section.innerHTML += `<div class="data-item"><strong>Besoin Total Estimé :</strong> ${data.besoinTotalMin} - ${data.besoinTotalMax} MAD</div>`;
    section.innerHTML += `<div class="data-item"><strong>Notes :</strong> ${data.notes}</div>`;
}

function afficher