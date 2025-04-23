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
    section.innerHTML += `<div class="data-item"><strong>Véhicule :</strong> ${data.vehicule.type} (${data.vehicule.prix} MAD)</div>`;
    section.innerHTML += `<div class="data-item"><strong>Loyer Logement Ouvriers :</strong> ${data.loyerLogementOuvriers} MAD/mois</div>`;
    section.innerHTML += `<div class="data-item"><strong>Zone de chalandise :</strong> ${data.zoneChalandise}</div>`;
    section.innerHTML += `<div class="data-item"><strong>Autres :</strong> ${data.autres}</div>`;
}

function afficherPlanInvestissement(data) {
    const section = document.getElementById('plan-investissement');
    section.innerHTML += `<div class="data-item"><strong>Besoin Total Estimé :</strong> ${data.besoinTotalMin} - ${data.besoinTotalMax} MAD</div>`;
    section.innerHTML += `<div class="data-item"><strong>Notes :</strong> ${data.notes}</div>`;
}

function afficherChargesExploitation(data) {
    const section = document.getElementById('charges-exploitation');
    section.innerHTML = '<h3>Charges d\'Exploitation Prévisionnelles (Année 1)</h3>';
    data.forEach(charge => {
        let ligne = `<div class="data-item"><strong>${charge.poste} :</strong> `;
        if (charge.estimationMensuelleMin !== undefined && charge.estimationMensuelleMax !== undefined) {
            ligne += `${charge.estimationMensuelleMin} - ${charge.estimationMensuelleMax} MAD/mois (${charge.estimationAnnuelleMin} - ${charge.estimationAnnuelleMax} MAD/an)`;
        } else if (charge.estimationMensuelle !== undefined && charge.estimationAnnuelle !== undefined) {
            ligne += `${charge.estimationMensuelle} MAD/mois (${charge.estimationAnnuelle} MAD/an)`;
        } else {
            ligne += `${charge.estimationMensuelle || charge.estimationAnnuelle || 'Variable'}`;
        }
        if (charge.notes) {
            ligne += ` <span class="notes">(${charge.notes})</span>`;
        }
        ligne += `</div>`;
        section.innerHTML += ligne;
    });
}

function afficherPrevisionsCA(data) {
    const section = document.getElementById('previsions-ca');
    section.innerHTML = '<h3>Prévisions de Chiffre d\'Affaires (CA)</h3>';
    section.innerHTML += `<div class="data-item"><strong>Année 1 :</strong> ${data.annee1} MAD</div>`;
    section.innerHTML += `<div class="data-item"><strong>Année 2 :</strong> ${data.annee2} MAD</div>`;
    section.innerHTML += `<div class="data-item"><strong>Année 3 :</strong> ${data.annee3} MAD</div>`;
    section.innerHTML += `<div class="data-item"><strong>Vigilance :</strong> ${data.vigilance}</div>`;
}

function afficherPlanFinancement(data) {
    const section = document.getElementById('plan-financement');
    section.innerHTML = '<h3>Plan de Financement Initial</h3>';
    section.innerHTML += `<div class="data-item"><strong>Besoin à Financer Estimé :</strong> ${data.besoinFinancerMin} - ${data.besoinFinancerMax} MAD</div>`;
}

function afficherCompteResultat(data) {
    const sectionAnnee1 = document.getElementById('resultat-annee1');
    sectionAnnee1.innerHTML = '<h3>Année 1</h3>';
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>Chiffre d'Affaires (CA) :</strong> ${data.annee1.chiffreAffaires} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(-) Achats Consommables :</strong> ${data.annee1.achatsConsommables} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>= Marge Brute :</strong> ${data.annee1.margeBrute} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(-) Salaires et Charges :</strong> ${data.annee1.salairesEtCharges} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(-) Autres Charges Ext. :</strong> ${data.annee1.autresChargesExt} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>= Excédent Brut d'Exploitation (EBE) :</strong> ${data.annee1.ebe} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(-) Dotations aux Amortissements :</strong> ${data.annee1.dotationsAmortissements} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>= Résultat d'Exploitation (RE) :</strong> ${data.annee1.resultatExploitation} MAD</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(-) Charges Financières :</strong> ${data.annee1.chargesFinancieres}</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(+) Produits Financiers :</strong> ${data.annee1.produitsFinanciers}</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>= Résultat Courant Avant Impôt (RCAI) :</strong> ${data.annee1.rcai}</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(-) Impôt sur les Sociétés (IS) ou IR :</strong> ${data.annee1.impotSocietesIR}</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>= Résultat Net Comptable :</strong> ${data.annee1.resultatNetComptable}</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>(+) Amortissements :</strong> ${data.annee1.caf}</div>`;
    sectionAnnee1.innerHTML += `<div class="data-item"><strong>= Capacité d'Autofinancement (CAF) :</strong> ${data.annee1.caf}</div>`;

    const sectionAnnee2 = document.getElementById('resultat-annee2');
    sectionAnnee2.innerHTML = '<h3>Année 2</h3>';
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>Chiffre d'Affaires (CA) :</strong> ${data.annee2.chiffreAffaires} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(-) Achats Consommables :</strong> ${data.annee2.achatsConsommables} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>= Marge Brute :</strong> ${data.annee2.margeBrute} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(-) Salaires et Charges :</strong> ${data.annee2.salairesEtCharges} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(-) Autres Charges Ext. :</strong> ${data.annee2.autresChargesExt} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>= Excédent Brut d'Exploitation (EBE) :</strong> ${data.annee2.ebe} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(-) Dotations aux Amortissements :</strong> ${data.annee2.dotationsAmortissements} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>= Résultat d'Exploitation (RE) :</strong> ${data.annee2.resultatExploitation} MAD</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(-) Charges Financières :</strong> ${data.annee2.chargesFinancieres}</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(+) Produits Financiers :</strong> ${data.annee2.produitsFinanciers}</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>= Résultat Courant Avant Impôt (RCAI) :</strong> ${data.annee2.rcai}</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(-) Impôt sur les Sociétés (IS) ou IR :</strong> ${data.annee2.impotSocietesIR}</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>= Résultat Net Comptable :</strong> ${data.annee2.resultatNetComptable}</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>(+) Amortissements :</strong> ${data.annee2.caf}</div>`;
    sectionAnnee2.innerHTML += `<div class="data-item"><strong>= Capacité d'Autofinancement (CAF) :</strong> ${data.annee2.caf}</div>`;

    const sectionAnnee3 = document.getElementById('resultat-annee3');
    sectionAnnee3.innerHTML = '<h3>Année 3</h3>';
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>Chiffre d'Affaires (CA) :</strong> ${data.annee3.chiffreAffaires} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(-) Achats Consommables :</strong> ${data.annee3.achatsConsommables} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>= Marge Brute :</strong> ${data.annee3.margeBrute} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(-) Salaires et Charges :</strong> ${data.annee3.salairesEtCharges} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(-) Autres Charges Ext. :</strong> ${data.annee3.autresChargesExt} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>= Excédent Brut d'Exploitation (EBE) :</strong> ${data.annee3.ebe} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(-) Dotations aux Amortissements :</strong> ${data.annee3.dotationsAmortissements} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>= Résultat d'Exploitation (RE) :</strong> ${data.annee3.resultatExploitation} MAD</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(-) Charges Financières :</strong> ${data.annee3.chargesFinancieres}</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(+) Produits Financiers :</strong> ${data.annee3.produitsFinanciers}</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>= Résultat Courant Avant Impôt (RCAI) :</strong> ${data.annee3.rcai}</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(-) Impôt sur les Sociétés (IS) ou IR :</strong> ${data.annee3.impotSocietesIR}</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>= Résultat Net Comptable :</strong> ${data.annee3.resultatNetComptable}</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>(+) Amortissements :</strong> ${data.annee3.caf}</div>`;
    sectionAnnee3.innerHTML += `<div class="data-item"><strong>= Capacité d'Autofinancement (CAF) :</strong> ${data.annee3.caf}</div>`;
}

function afficherSeuilRentabilite(data) {
    const section = document.getElementById('seuil-rentabilite');
    section.innerHTML = '<h3>Seuil de Rentabilité (Point Mort)</h3>';
    section.innerHTML += `<div class="data-item"><strong>Nouvelles Charges Fixes Annuelles Estimées :</strong> ${data.nouvellesCfEstimees} MAD</div>`;
    section.innerHTML += `<div class="data-item"><strong>Taux de Marge sur Coûts Variables Estimé :</strong> ${data.tauxMargeCvEstime * 100}%</div>`;
    section.innerHTML += `<div class="data-item"><strong>Nouveau Seuil de Rentabilité (Exemple) :</strong> ${data.nouveauSeuilRentabilite} MAD de CA annuel</div>`;
    section.innerHTML += `<div class="data-item"><strong>Interprétation :</strong> ${data.interpretation}</div>`;
}

function afficherConclusion(data) {
    const section = document.getElementById('conclusion');
    section.innerHTML = '<h3>Conclusion Mise à Jour</h3>';
    section.innerHTML += `<div class="data-item">${data.point1}</div>`;
    section.innerHTML += `<div class="data-item">${data.point2}</div>`;
    section.innerHTML += `<div class="data-item">${data.point3}</div>`;
    section.innerHTML += `<div class="data-item">${data.point4}</div>`;
}
