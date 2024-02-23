export function getJWTData(): Record<string, any> | null {
    // Récupérez le token JWT depuis le localStorage
    const token = localStorage.getItem('jwtToken');

    // Vérifiez si le token est présent dans le localStorage
    if (token) {
        // Utilisez la fonction decodeJwtToken pour décoder le token JWT
        const decodedToken = decodeJwtToken(token);

        // Vérifiez si le décodage du token a réussi
        if (decodedToken) {
            return decodedToken;
        } else {
            console.error('Erreur lors du décodage du token JWT.');
            return null;
        }
    } else {
        console.error('Token JWT non trouvé dans le localStorage.');
        return null;
    }
}

export function decodeJwtToken(jwtToken: string): any {
    // Implémentez la logique de décodage du jeton JWT ici
    // Cette fonction dépendra de la manière dont vos jetons JWT sont encodés
    // Vous pouvez utiliser une bibliothèque comme jsonwebtoken si vous utilisez Node.js
    // Ou une fonction de décodage personnalisée si vous utilisez une autre plateforme
    // Pour cet exemple, nous supposons simplement que le jeton est déjà décodé et renvoyons son contenu
    return JSON.parse(atob(jwtToken.split('.')[1]));
  }

export function verifyToken(jwtToken: string | null): boolean {
    if (!jwtToken) {
      return false; // Si le jeton est inexistant, il est considéré comme invalide
    }
  
    try {
      // Dans cet exemple, nous supposons que le jeton est au format JWT
      // Vous devrez adapter cette logique en fonction de votre configuration JWT
      const decodedToken = decodeJwtToken(jwtToken); // Fonction pour décoder le jeton JWT
  
      // Ici, vous devez implémenter une logique de vérification plus approfondie selon vos besoins
      // Par exemple, vérifier l'expiration du jeton, vérifier la signature, etc.
      if (decodedToken.exp < Date.now() / 1000) {
        // Si le jeton a expiré, il est considéré comme invalide
        return false;
      }
  
      // Autres vérifications possibles...
  
      return true; // Si toutes les vérifications réussissent, le jeton est considéré comme valide
    } catch (error) {
      console.error('Error decoding/verifying JWT:', error);
      return false; // En cas d'erreur, le jeton est considéré comme invalide
    }
  }