# Feuille de route – Signalement Cyano Mobile

## 1. Sécurité & Données
- [x] Vérifier et renforcer les règles Firestore (lecture publique, écriture uniquement pour les utilisateurs authentifiés)
- [x] Vérifier la confidentialité des données utilisateurs (pas d’info sensible dans les signalements publics)

## 2. Expérience Utilisateur (UX/UI)
- [x] Améliorer le design (couleurs, boutons, feedback visuel, responsive)
- [x] Ajouter des messages d’erreur et de succès clairs (ex : Toast, Alert, etc.) ✅
- [x] Optimiser l’ergonomie mobile (touches, champs, navigation) ✅
	- [x] Améliorer la gestion du clavier (fermeture automatique, scroll sur champ focus, padding évitant la superposition)
	- [x] Agrandir les zones tactiles des boutons et champs importants
	- [x] Ajouter un retour visuel sur les boutons pressés (opacité, ripple, etc.)
	- [x] Optimiser la navigation (retour facile, navigation claire, titres d’écrans)
	- [x] Pré-remplir ou suggérer les champs fréquents (autocomplétion, suggestions)
	- [x] Ajouter un accès rapide à l’accueil ou à la liste depuis tous les écrans
	- [x] Tester l’ergonomie sur plusieurs tailles d’écran et corriger les débordements

## 3. Fonctionnalités
- [ ] Afficher les détails d’un signalement (clic sur un item de la liste)
- [ ] Ajouter la recherche et les filtres dans la liste des signalements (par date, lieu, type, etc.)
- [ ] (Optionnel) Ajouter l’upload de photo (avec gestion des droits et stockage Firebase)
- [ ] (Optionnel) Notifications (push/email pour nouveaux signalements ou suivi)

## 4. Qualité & Tests
- [ ] Tests utilisateurs (retours terrain, corrections d’ergonomie)
- [ ] Tests techniques (validation sur plusieurs appareils, gestion offline, erreurs réseau)

## 5. Déploiement
- [ ] Préparer les builds Android/iOS (icônes, splash, permissions, versioning)
- [ ] Publier sur Google Play / App Store (création comptes développeur, screenshots, description, politique de confidentialité)

## 6. Documentation & Suivi
- [ ] Rédiger une documentation utilisateur (FAQ, guide rapide)
- [ ] Documenter le code et la configuration (README, commentaires, scripts de déploiement)
- [ ] Mettre en place un suivi des bugs et évolutions (Trello, GitHub Issues, etc.)
